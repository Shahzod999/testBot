import { useEffect } from "react";
import "./fullScreenImgSwiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";

interface FullScreenImgSwiperProps {
  imgOpen: boolean;
  setImgOpen: (open: boolean) => void;
  images: string[];
  toggleImgOpen: (i: number) => void;
  indexImg: number;
  local?: boolean;
}

const FullScreenImgSwiper = ({
  imgOpen,
  setImgOpen,
  images,
  toggleImgOpen,
  indexImg,
  local,
}: FullScreenImgSwiperProps) => {
  useEffect(() => {
    if (imgOpen) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(() => {
        setImgOpen(false);
      });
    } else {
      window.Telegram.WebApp.BackButton.hide();
    }
    return () => {
      window.Telegram.WebApp.BackButton.offClick(() => {});
    };
  }, [imgOpen]);

  return (
    <div className="fullScreenImg" onClick={() => toggleImgOpen(0)}>
      <Swiper
        modules={[Pagination]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        initialSlide={indexImg}>
        {images?.map((item, i) => (
          <SwiperSlide key={i}>
            {local ? (
              <img
                src={item}
                alt="LargePhoto photo"
                className="comment__FullImage"
              />
            ) : (
              <img
                src={`https://dev.admin13.uz${item}`}
                alt="LargePhoto photo"
                className="comment__FullImage"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenImgSwiper;
