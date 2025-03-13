import WelcomeBox from "./WelcomeBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import welcomeSecond from "../../../../public/welcomeSecond.json";
import openDoorUtya from "../../../../public/utya/openDoor.json";
import baristaUtya from "../../../../public/baristaUtya.json";
// import searchUtya from "../../../../public/searchUtya.json";
import "./welcome.scss";
import CommonButton from "../../../components/Actions/CommonButton";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setConfitti } from "../../../app/features/RaitingStarsSlice";
import { hapticVibration } from "../../../hooks/hapticVibration";
import { useTranslation } from "react-i18next";
import { selectedCompany } from "../../../app/features/companyStateSlice";

const Welcome = () => {
  const companyInfo = useAppSelector(selectedCompany);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);

  const handleNavigate = () => {
    const tg = window.Telegram?.WebApp;

    if (tg.version >= "6.9") {
      tg.CloudStorage.setItem("user", "true");
    }

    navigate("/");
    setTimeout(() => {
      dispatch(setConfitti());
    }, 200);
  };

  const handleLink = () => {
    hapticVibration("light");

    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const currentSlideIndex = swiper.realIndex;
    swiper.slideNext();

    if (currentSlideIndex === 2) {
      handleNavigate();
    }
  };

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
              img={openDoorUtya}
              title={companyInfo?.name || t("welcomeOne")}
              text={companyInfo?.description || t("welcomeThree")}
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
        <CommonButton createdFunction={handleLink}>{t("next")}</CommonButton>
      </div>
    </div>
  );
};

export default Welcome;
