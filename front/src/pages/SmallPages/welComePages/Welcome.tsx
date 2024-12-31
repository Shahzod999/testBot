import WelcomeBox from "./WelcomeBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import welcomeSecond from "../../../../public/welcomeSecond.json";
import baristaUtya from "../../../../public/baristaUtya.json";
import searchUtya from "../../../../public/searchUtya.json";
import "./welcome.scss";
import CommonButton from "../../../components/Actions/CommonButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setConfitti } from "../../../app/features/RaitingStarsSlice";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("Дальше");
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);

  const handleNavigate = () => {
    navigate("/");
    setTimeout(() => {
      dispatch(setConfitti());
    }, 200);
  };

  const handleLink = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");

    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const currentSlideIndex = swiper.realIndex;
    swiper.slideNext();

    if (currentSlideIndex === 1) {
      setText("Начать");
    }
    if (currentSlideIndex === 2) {
      handleNavigate();
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const updateText = () => {
      const currentSlideIndex = swiper.realIndex;
      if (currentSlideIndex === 2) setText("Начать");
    };

    swiper.on("slideChange", updateText);
    return () => swiper.off("slideChange", updateText);
  }, []);

  return (
    <div className="notFoundPage">
      <div className="notFoundPage__icon" onClick={handleNavigate}>
        <span>Пропустить</span>
      </div>
      <div className="notFoundPage__sticker">
        <Swiper
          modules={[Pagination]}
          className="mySwiper"
          pagination={{
            clickable: true,
          }}
          ref={swiperRef}>
          <SwiperSlide>
            <WelcomeBox
              img={searchUtya}
              title="O’zingizga eng yaqin bo’lgan joylarni bir zumda toping!"
              text="Restoranlar, kafelar va qahvaxonalarni telegramdan chiqmasdan toping va do’stlaringiz bilan ulashing!"
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={welcomeSecond}
              title="Joylardagi aksiyalarni kuzatib boring va foydalaning"
              text="Joy ma’lumotlaridan “Aksiyalar” bo’limiga o’ting va aksiyalardan unumli foydalaning"
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={baristaUtya}
              title="O’zingizga eng yaqin bo’lgan joylarni bir zumda toping!"
              text="Restoranlar, kafelar va qahvaxonalarni telegramdan chiqmasdan toping va do’stlaringiz bilan ulashing!"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="notFoundPage__button">
        <CommonButton createdFunction={handleLink}>{text}</CommonButton>
      </div>
    </div>
  );
};

export default Welcome;
