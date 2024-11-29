import { useState } from "react";
import "./raiting.scss";
import { IoIosStar } from "react-icons/io";
import AddComment from "./AddComment/AddComment";
import RaitingStars from "./RaitingStars";

const Raiting = () => {
  const [openComment, setOpenCommet] = useState(false);

  const toggleComment = () => {
    setOpenCommet(!openComment);
  };

  return (
    <>
      <div className="raiting" onClick={toggleComment}>
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

      <AddComment openComment={openComment} toggleComment={toggleComment} />
    </>
  );
};

export default Raiting;
