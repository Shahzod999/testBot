import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./header.scss";
import { useState } from "react";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  const [openImg, setOpenImg] = useState(false);

  console.log(openImg);

  return (
    <header
      onClick={() => setOpenImg(!openImg)}
      className={`${openImg ? "fullScreenImg" : ""}`}>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {img?.map((item) => (
          <>
            <SwiperSlide key={item.photo_id}>
              {openImg ? (
                <img src={item.photo_url_large} alt="LargePhoto photo" />
              ) : (
                <img src={item.photo_url} alt="photoUrl photo" />
              )}
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </header>
  );
};

export default Header;
