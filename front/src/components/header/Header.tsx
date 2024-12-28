import { useEffect, useState } from "react";
import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./header.scss";
import { Pagination, Zoom } from "swiper/modules";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  popBackButtonHandler,
  pushBackButtonHandler,
} from "../../app/features/backButtonState";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  const [openImg, setOpenImg] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleBackButtonClick = () => setOpenImg(false);

    if (openImg) {
      dispatch(pushBackButtonHandler(handleBackButtonClick));
    } else {
      dispatch(popBackButtonHandler());
    }

    return () => {
      if (openImg) {
        dispatch(popBackButtonHandler());
      }
    };
  }, [openImg, dispatch]);

  if (!img || img.length === 0) {
    return (
      <header
        onClick={() => setOpenImg(!openImg)}
        className={`${openImg ? "fullScreenImg" : ""}`}>
        <img src="./defaultMain.jpg" />
      </header>
    );
  }
  return (
    <header
      onClick={() => setOpenImg(!openImg)}
      className={`${openImg ? "fullScreenImg" : ""}`}>
      <Swiper
        modules={[Pagination, Zoom]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        zoom={{ maxRatio: 3 }}>
        {img?.map((item, index) => (
          <SwiperSlide key={item.photo_id || index}>
            <div className="swiper-zoom-container">
              <img
                src={getValidatedUrl(item.photo_url_large)}
                alt="Slide image"
                className={openImg ? "" : "headerSwiper"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};

export default Header;
