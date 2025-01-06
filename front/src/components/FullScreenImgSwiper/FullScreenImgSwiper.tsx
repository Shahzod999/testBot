import "./fullScreenImgSwiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Zoom } from "swiper/modules";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";
import { useEffect } from "react";

interface FullScreenImgSwiperProps {
  imgOpen: boolean;
  setImgOpen: (open: boolean) => void;
  images: string[];
  indexImg: number;
}

const FullScreenImgSwiper = ({
  imgOpen,
  setImgOpen,
  images,
  indexImg,
}: FullScreenImgSwiperProps) => {
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (imgOpen) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        setImgOpen(false);
        tg.BackButton.hide();
      });
    }
  }, [imgOpen]);

  return (
    <div className="fullScreenImg">
      <Swiper
        modules={[Pagination, Zoom]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        zoom={{ maxRatio: 3, minRatio: 1 }}
        initialSlide={indexImg}
        loop>
        {images?.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="swiper-zoom-container"
              onClick={() => setImgOpen(true)}>
              <img
                src={getValidatedUrl(item)}
                alt="LargePhoto photo"
                className="comment__FullImage"
                loading="lazy"
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenImgSwiper;
