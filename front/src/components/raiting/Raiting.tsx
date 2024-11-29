import "./raiting.scss";
import { IoIosStar } from "react-icons/io";
import AddComment from "./AddComment";
import RaitingStars from "./RaitingStars";

const Raiting = () => {
  return (
    <>
      <div className="raiting">
        <div className="raiting__count">
          <p>
            На основе 16 отзывов людей из <span>Google</span>
          </p>
          <strong>
            <IoIosStar size={27} />
            4.9
          </strong>
        </div>
        <RaitingStars />
      </div>
      <AddComment />
    </>
  );
};

export default Raiting;
