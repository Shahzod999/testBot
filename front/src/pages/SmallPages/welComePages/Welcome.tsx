import WelcomeBox from "./WelcomeBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import welcomeSecond from "../../../../public/welcomeSecond.json";
import "./welcome.scss";
import CommonButton from "../../../components/Actions/CommonButton";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate("/");
  };

  return (
    <div className="notFoundPage">
      <div className="notFoundPage__sticker">
        <Swiper
          modules={[Pagination]}
          className="mySwiper"
          pagination={{
            clickable: true,
          }}>
          <SwiperSlide>
            <WelcomeBox
              img={welcomeSecond}
              title="O’zingizga eng yaqin bo’lgan joylarni bir zumda toping!"
              text="Restoranlar, kafelar va qahvaxonalarni telegramdan chiqmasdan toping va do’stlaringiz bilan ulashing!"
              button="Дальше"
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={welcomeSecond}
              title="Joylardagi aksiyalarni kuzatib boring va foydalaning"
              text="Joy ma’lumotlaridan “Aksiyalar” bo’limiga o’ting va aksiyalardan unumli foydalaning"
              button="Дальше"
            />
          </SwiperSlide>
          <SwiperSlide>
            <WelcomeBox
              img={welcomeSecond}
              title="O’zingizga eng yaqin bo’lgan joylarni bir zumda toping!"
              text="Restoranlar, kafelar va qahvaxonalarni telegramdan chiqmasdan toping va do’stlaringiz bilan ulashing!"
              button="Начать"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="notFoundPage__button">
        <CommonButton createdFunction={handleLink}>Дальше</CommonButton>
      </div>
    </div>
  );
};

export default Welcome;
