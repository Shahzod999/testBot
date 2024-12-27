import { useEffect, useState } from "react";
import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./header.scss";
import { Pagination, Zoom } from "swiper/modules";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  const [openImg, setOpenImg] = useState(false);

  useEffect(() => {
    const handleBackButtonClick = () => setOpenImg(false);
    if (openImg) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    } else {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    }

    return () => {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    };
  }, [openImg]);

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
        {img?.map((item) => (
          <SwiperSlide key={item.photo_id}>
            <div className="swiper-zoom-container">
              <img
                src={getValidatedUrl(
                  openImg ? item.photo_url_large : item.photo_url,
                )}
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
