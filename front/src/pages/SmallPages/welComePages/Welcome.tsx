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
import { hapticVibration } from "../../../hooks/hapticVibration";

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
    hapticVibration("success", "light");

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
              title="Мгновенно находите ближайшие к вам места!"
              text="Находите рестораны, кафе и кофейни, не выходя из Telegram, и делитесь ими с друзьями!"
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={welcomeSecond}
              title="Следите и воспользуйтесь акциями в местах"
              text="Перейдите в раздел «Акции» из информации о локации и воспользуйтесь акциями."
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={baristaUtya}
              title="Мгновенно находите ближайшие к вам места!"
              text="Находите рестораны, кафе и кофейни, не выходя из Telegram, и делитесь ими с друзьями!"
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
