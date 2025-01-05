import { useEffect, useState } from "react";
import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import "./header.scss";
import { Autoplay, Pagination, Zoom } from "swiper/modules";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  const tg = window.Telegram.WebApp;
  const [openImg, setOpenImg] = useState(false);

  const handleClose = () => {
    setOpenImg(!openImg);
  };

  useEffect(() => {
    if (openImg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        handleClose();
        tg.BackButton.offClick(handleClose);
      });
    } else {
      tg.BackButton.hide();
    }
  }, [setOpenImg, handleClose]);

  if (!img || img.length === 0) {
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
        {img?.map((item, index) => (
          <SwiperSlide key={item.photo_id || index}>
            <div className="swiper-zoom-container">
              <img
                src={getValidatedUrl(item.photo_url_large)}
                alt="Slide image"
                className={openImg ? "" : "headerSwiper"}
                loading="lazy"
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
    </header>
  );
};

export default Header;
