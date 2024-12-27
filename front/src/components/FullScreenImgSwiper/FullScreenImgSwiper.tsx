import { useEffect } from "react";
import "./fullScreenImgSwiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Zoom } from "swiper/modules";

interface FullScreenImgSwiperProps {
  imgOpen: boolean;
  setImgOpen: (open: boolean) => void;
  images: string[];
  indexImg: number;
  local?: boolean;
}

const FullScreenImgSwiper = ({
  imgOpen,
  setImgOpen,
  images,
  indexImg,
  local,
}: FullScreenImgSwiperProps) => {
  useEffect(() => {
    const handleBackButtonClick = () => setImgOpen(false);
    if (imgOpen) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    } 
    else {
      window.Telegram.WebApp.BackButton.hide();
    }
    return () => {
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    };
  }, [imgOpen]);

  return (
    <div className="fullScreenImg" >
      <Swiper
        modules={[Pagination, Zoom]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        zoom={{ maxRatio: 3 }}
        initialSlide={indexImg}>
        {images?.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-zoom-container" onClick={() => setImgOpen(!imgOpen)}>
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenImgSwiper;
