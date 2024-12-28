import { useEffect } from "react";
import "./fullScreenImgSwiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Zoom } from "swiper/modules";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  popBackButtonHandler,
  pushBackButtonHandler,
} from "../../app/features/backButtonState";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleBackButtonClick = () => setImgOpen(false);

    if (imgOpen) {
      dispatch(pushBackButtonHandler(handleBackButtonClick));
    }

    return () => {
      if (imgOpen) {
        dispatch(popBackButtonHandler());
      }
    };
  }, [imgOpen, dispatch]);

  return (
    <div className="fullScreenImg">
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
            <div
              className="swiper-zoom-container"
              onClick={() => setImgOpen(!imgOpen)}>
              <img
                src={getValidatedUrl(item)}
                alt="LargePhoto photo"
                className="comment__FullImage"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenImgSwiper;
