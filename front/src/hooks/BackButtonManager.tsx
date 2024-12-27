import { useEffect } from "react";
import { selectBackButtonStack } from "../app/features/backButtonState";
import { useAppSelector } from "./reduxHooks";

const BackButtonManager = () => {
  const stack = useAppSelector(selectBackButtonStack);

  useEffect(() => {
    if (stack.length > 0) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(() => {
        const handler = stack[stack.length - 1]; // Получаем последний обработчик
        if (handler) handler(); // Вызываем его
      });
    } else {
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [stack]);

  return null;
};

export default BackButtonManager;
