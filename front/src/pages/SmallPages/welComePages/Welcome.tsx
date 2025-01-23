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
import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [text, setText] = useState(t("next"));
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
      setText(t("start"));
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
      if (currentSlideIndex === 2) setText(t("start"));
    };

    swiper.on("slideChange", updateText);
    return () => swiper.off("slideChange", updateText);
  }, []);

  return (
    <div className="notFoundPage">
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
              title={t("welcomeOne")}
              text={t("welcomeThree")}
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={welcomeSecond}
              title={t("welcomeTwo")}
              text={t("welcomeFour")}
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={baristaUtya}
              title={t("welcomeOne")}
              text={t("welcomeThree")}
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
