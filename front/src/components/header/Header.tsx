import { useEffect, useState } from "react";
import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./header.scss";

import { Pagination } from "swiper/modules";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  const [openImg, setOpenImg] = useState(false);


  useEffect(() => {
    if (openImg) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(() => setOpenImg(false));
    } else {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(() => {});
    }

    return () => {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(() => {});
    };
  }, [openImg]);

  console.log(openImg);

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
        modules={[Pagination]}
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        zoom={{ maxRatio: 3 }}>
        {img?.map((item) => (
          <SwiperSlide key={item.photo_id}>
            {openImg ? (
              <img
                src={getValidatedUrl(item.photo_url_large)}
                alt="LargePhoto photo"
              />
            ) : (
              <img
                src={getValidatedUrl(item.photo_url_large)}
                alt="photoUrl photo"
                className="headerSwiper"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};

export default Header;
