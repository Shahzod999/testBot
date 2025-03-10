import { useEffect, useState } from "react";
import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import "./header.scss";
import { Autoplay, Pagination, Zoom } from "swiper/modules";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";
import { ReactSVG } from "react-svg";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  const tg = window.Telegram.WebApp;
  const newImg = img
    .map((item) => ({
      ...item,
      validUrl: item.photo_url_large || item.photo_url,
    }))
    .filter((item) => item.validUrl);

  const [openImg, setOpenImg] = useState(false);

  const handleClose = () => {
    setOpenImg(!openImg);
  };

  useEffect(() => {
    if (openImg) {
      tg.BackButton.show();

      const handleBackClick = () => {
        handleClose();
      };

      tg.BackButton.onClick(handleBackClick);
      return () => {
        tg.BackButton.offClick(handleBackClick);
      };
    } else {
      tg.BackButton.hide();
    }
  }, [setOpenImg, handleClose]);

  useEffect(() => {
    const video = document.getElementById("videoPlayer") as HTMLVideoElement;
    if (video) {
      video.play().catch((error) => console.warn("AutoPlay blocked:", error));
    }
  }, []);

  if (!newImg || newImg.length === 0) {
    return (
      <header
        onClick={handleClose}
        className={`${openImg ? "fullScreenImg" : ""}`}>
        <img src="./defaultMain.jpg" />
      </header>
    );
  }
  return (
    <header
      onClick={handleClose}
      className={`${openImg ? "fullScreenImg" : ""}`}>
      <Swiper
        onSlideChange={(swiper) => {
          const bullets = document.querySelectorAll(
            ".swiper-pagination-bullet",
          );
          bullets.forEach((bullet, index) => {
            if (index < swiper.realIndex) {
              bullet.classList.add("passed");
            } else {
              bullet.classList.remove("passed");
            }
          });
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
          renderBullet: (_, className) => {
            return `
              <span class="${className}">
                <i></i>
                <b></b>
              </span>
            `;
          },
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        zoom={{ maxRatio: 3, minRatio: 1 }}
        modules={[Pagination, Zoom, Autoplay]}
        className="mySwiper"
        watchSlidesProgress
        loop>
        {newImg.map((item, index) => (
          <SwiperSlide key={item.photo_id || index}>
            <div className="swiper-zoom-container">
              {item.type == "video" ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  muted
                  className="headerSwiperVideo"
                  preload="auto">
                  <source src={item.validUrl} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              ) : (
                <>
                  <img
                    src={getValidatedUrl(item.validUrl)}
                    alt="image"
                    loading="lazy"
                  />
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>

      <div className="header__foto">
        <ReactSVG src="./camera.fill.svg" />
        <span>{img.length}</span>
      </div>
    </header>
  );
};

export default Header;
