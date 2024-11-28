import { PhotosSample } from "../../app/types/companyType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./header.scss";

interface HeaderProps {
  img: PhotosSample[];
}

const Header = ({ img }: HeaderProps) => {
  return (
    <header>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {img?.map((item) => (
          <SwiperSlide key={item.photo_id}>
            <img src={item.photo_url} alt="place photo" />
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};

export default Header;
