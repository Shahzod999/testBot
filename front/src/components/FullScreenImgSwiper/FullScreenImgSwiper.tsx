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
}

const FullScreenImgSwiper = ({
  imgOpen,
  setImgOpen,
  images,
  toggleImgOpen,
  indexImg,
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
  console.log(images, "222");

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
            <img
              src={`https://dev.admin13.uz${item}`}
              alt="LargePhoto photo"
              className="comment__FullImage"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenImgSwiper;
