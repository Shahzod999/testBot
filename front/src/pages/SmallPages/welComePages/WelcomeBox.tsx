import Lottie from "lottie-react";
import "../404/notFoundPage.scss";

interface WelcomeBoxProps {
  img: object;
  title: string;
  text: string;
  button: string;
}

const WelcomeBox = ({ img, title, text }: WelcomeBoxProps) => {
  return (
    <div className="notFoundPage__sticker__box">
      <div className="notFoundPage__sticker__box__img">
        <Lottie animationData={img} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default WelcomeBox;
