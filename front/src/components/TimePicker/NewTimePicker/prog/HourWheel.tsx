import {
  useEffect,
  useState,
  useRef,
  TouchEvent,
  WheelEvent,
  MouseEvent,
} from "react";
import { initialNumbersValue, returnSelectedValue } from "../helpers";

function HourWheel({
  height,
  value,
  setValue,
  isDarkMode,
}: {
  height: number;
  value: string | null | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  isDarkMode?: boolean;
}) {
  const hourLength = 24;

  // Генерация списка часов с отмеченным выбранным значением
  const [hours, setHours] = useState(
    initialNumbersValue(height, hourLength, parseInt(value!.slice(0, 2))),
  );

  // Ссылка на div, который смещаем по Y
  const mainListRef = useRef<HTMLDivElement>(null);

  // Для расчёта дистанции перетаскивания
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [firstCursorPosition, setFirstCursorPosition] = useState<number>(0);

  // Текущий сдвиг translateY
  const [currentTranslatedValue, setCurrentTranslatedValue] = useState(() => {
    // Ищем выбранный элемент из initialNumbersValue
    const arr = initialNumbersValue(
      height,
      hourLength,
      parseInt(value!.slice(0, 2)),
    );
    const found = arr.find(
      (item) =>
        item.number === value!.slice(0, 2) && item.selected === true,
    );
    return found ? parseInt(found.translatedValue) : 0;
  });

  // Флаг «идёт ли сейчас перетаскивание»
  const [startCapture, setStartCapture] = useState(false);
  // Флаг «завершили ли жест и надо сделать финальное смещение»
  const [showFinalTranslate, setShowFinalTranslate] = useState(false);

  // Время начала и конца тапа/перетаскивания
  const [dragStartTime, setDragStartTime] = useState<number>(0);
  const [dragEndTime, setDragEndTime] = useState<number>(0);

  // Храним длительность чисто для отладки
  const [, setDragDuration] = useState<number | null>(null);

  // Тип прокрутки: «fast» (инерционная) или «slow» (просто округлить)
  const [dragType, setDragType] = useState<"" | "fast" | "slow">("");

  // Направление (down/up) — если это нужно для вашей логики
  const [dragDirection, setDragDirection] = useState<"down" | "up" | null>(
    null,
  );

  console.log(dragDirection);
  
  // Выбранный час (если надо где-то хранить числом)
  const [, setSelectedNumber] = useState<number | undefined>(undefined);

  /* ****************************************************************************
      HANDLERS:  MOUSE / TOUCH START
  **************************************************************************** */

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setShowFinalTranslate(false);
    setFirstCursorPosition(e.clientY);
    setStartCapture(true);
    setDragStartTime(performance.now());
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setShowFinalTranslate(false);
    setFirstCursorPosition(e.targetTouches[0].clientY);
    setStartCapture(true);
    setDragStartTime(performance.now());
  };

  /* ****************************************************************************
      HANDLERS:  MOUSE / TOUCH MOVE
  **************************************************************************** */

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (startCapture) {
      setCursorPosition(e.clientY - firstCursorPosition);
    } else {
      setCursorPosition(0);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (startCapture) {
      setCursorPosition(e.targetTouches[0].clientY - firstCursorPosition);
    } else {
      setCursorPosition(0);
    }
  };

  /* ****************************************************************************
      HANDLERS:  MOUSE / TOUCH END (OR LEAVE)
  **************************************************************************** */

  const endDrag = () => {
    setStartCapture(false);
    setDragEndTime(performance.now());
    setShowFinalTranslate(true);

    // Сдвигаем текущий перевод на cursorPosition (то, что пользователь «протащил»)
    setCurrentTranslatedValue((prev) => prev + cursorPosition);

    const dragTime = performance.now() - dragStartTime;
    // Определяем «быстрая» ли прокрутка
    if (dragTime <= 150) {
      setDragType("fast");
    } else {
      setDragType("slow");
    }

    // Определяем направление
    if (cursorPosition < 0) {
      setDragDirection("down");
    } else {
      setDragDirection("up");
    }
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const handleMouseLeave = () => {
    if (startCapture) {
      endDrag();
    }
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  /* ****************************************************************************
      PREVIEW TRANSLATION WHILE DRAGGING
  **************************************************************************** */

  useEffect(() => {
    if (startCapture && mainListRef.current) {
      // Пока user двигает пальцем — предварительный сдвиг (без анимации)
      mainListRef.current.style.transform = `translateY(${
        currentTranslatedValue + cursorPosition
      }px)`;
    }
  }, [cursorPosition, currentTranslatedValue, startCapture]);

  /* ****************************************************************************
      FINAL TRANSLATION (MOMENTUM OR SIMPLE ROUNDING)
  **************************************************************************** */

  useEffect(() => {
    if (!showFinalTranslate || !mainListRef.current) return;

    const dragTime = dragEndTime - dragStartTime;
    setDragDuration(dragTime);

    if (dragType === "fast") {
      // ----- Инерция -----
      // velocity = distance / time
      const distance = cursorPosition; // cursorPosition уже может быть 0, если вы обнулили...
      const time = dragTime || 1;
      const velocity = distance / time;

      // Коэффициент «силы» инерции, подберите на вкус
      const factor = 300;

      let nextValue = currentTranslatedValue + velocity * factor;

      // Округление до ближайшего шага = height
      let finalValue = Math.round(nextValue / height) * height;

      // Лимиты (24 часа => -21*height.. +2*height)
      if (finalValue < height * -21) finalValue = height * -21;
      if (finalValue > height * 2) finalValue = height * 2;

      mainListRef.current.style.transform = `translateY(${finalValue}px)`;
      setCurrentTranslatedValue(finalValue);
    } else if (dragType === "slow") {
      // ----- Просто округлить -----
      let finalValue = Math.round(currentTranslatedValue / height) * height;

      if (finalValue < height * -21) finalValue = height * -21;
      if (finalValue > height * 2) finalValue = height * 2;

      mainListRef.current.style.transform = `translateY(${finalValue}px)`;
      setCurrentTranslatedValue(finalValue);
    }

    // Сброс
    setCursorPosition(0);
  }, [
    showFinalTranslate,
    currentTranslatedValue,
    cursorPosition,
    dragType,
    dragEndTime,
    dragStartTime,
    height,
  ]);

  /* ****************************************************************************
      ON TRANSITION END → ВЫБИРАЕМ ЧАС
  **************************************************************************** */

  const handleTransitionEnd = () => {
    // Ищем, какой элемент соответствует currentTranslatedValue
    const arr = returnSelectedValue(height, hourLength);
    arr.forEach((item) => {
      if (parseInt(item.translatedValue) === currentTranslatedValue) {
        setSelectedNumber(item.arrayNumber);

        // Формируем новое время HH:MM
        setValue((prev) => {
          const oldMM = prev?.slice(3, 5) || "00"; // минуты из старого value
          return `${item.number}:${oldMM}`;
        });

        // Обновляем стейт: подсвечиваем selected
        setHours(() => {
          const newValue = initialNumbersValue(height, hourLength).map(
            (hour) => {
              if (
                hour.number === item.number &&
                +hour.translatedValue === currentTranslatedValue
              ) {
                return {
                  ...hour,
                  selected: true,
                };
              }
              return hour;
            },
          );
          return newValue;
        });
      }
    });
  };

  /* ****************************************************************************
      CLICK TO SELECT (если пользователь кликает по элементу)
  **************************************************************************** */

  const handleClickToSelect = (e: MouseEvent<HTMLDivElement>) => {
    if (cursorPosition !== 0) return; // если идёт перетаскивание, игнорим

    const target = e.target as HTMLButtonElement | HTMLDivElement;
    const valueFromData = parseInt(target.dataset.translatedValue ?? "0");

    setCurrentTranslatedValue(valueFromData);

    // Запускаем "slow"-анимацию, чтобы колесо плавно встало на позицию
    setShowFinalTranslate(true);
    setDragType("slow");
    setDragEndTime(performance.now());
  };

  /* ****************************************************************************
      SCROLL WHEEL (делает +/- 1 шаг)
  **************************************************************************** */

  const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      // колесо вниз
      if (currentTranslatedValue < height * 2) {
        setCurrentTranslatedValue((prev) => prev + height);
      }
    } else {
      // колесо вверх
      if (currentTranslatedValue > height * -21) {
        setCurrentTranslatedValue((prev) => prev - height);
      }
    }
  };

  /* ****************************************************************************
      CSS КЛАССЫ ДЛЯ ПЕРЕХОДОВ FAST / SLOW
  **************************************************************************** */

  const isFastCondition = showFinalTranslate && dragType === "fast";
  const isSlowCondition = showFinalTranslate && dragType === "slow";

  return (
    <div
      className="react-wheel-time-picker-hour"
      style={{ height: height * 5 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheelScroll}
    >
      <div
        ref={mainListRef}
        className={`
          ${isFastCondition ? "react-wheel-time-picker-fast" : ""}
          ${isSlowCondition ? "react-wheel-time-picker-slow" : ""}
        `}
        onTransitionEnd={handleTransitionEnd}
        style={{ transform: `translateY(${currentTranslatedValue}px)` }}
      >
        {hours.map((hourObj, index) => (
          <div
            key={index}
            className="react-wheel-time-picker-cell-hour"
            style={{ height: `${height}px` }}
          >
            <div
              style={{
                color: isDarkMode
                  ? "#f7f7f7"
                  : hourObj.selected
                  ? "var(--text-color)"
                  : "#6a6a6b",
                fontSize: hourObj.selected ? 18 : 14,
              }}
              className={
                "react-wheel-time-picker-cell-inner-hour" +
                (hourObj.selected
                  ? " react-wheel-time-picker-cell-inner-selected"
                  : "") +
                (hourObj.hidden
                  ? " react-wheel-time-picker-cell-inner-hidden"
                  : "")
              }
              onClick={handleClickToSelect}
              data-translated-value={hourObj.translatedValue}
            >
              {hourObj.number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourWheel;
