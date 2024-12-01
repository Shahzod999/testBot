import { useState } from "react";
import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./header.scss";

import { Pagination } from "swiper/modules";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  const [openImg, setOpenImg] = useState(false);

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
        }}>
        {img?.map((item) => (
          <SwiperSlide key={item.photo_id}>
            {openImg ? (
              <img src={item.photo_url_large} alt="LargePhoto photo" />
            ) : (
              <img src={item.photo_url} alt="photoUrl photo" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};

export default Header;
