import { useState } from "react";
import "./raiting.scss";
import { IoIosStar } from "react-icons/io";

const Raiting = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
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

      <div className="raiting__set">
        <p>Нажмите, чтобы оценить:</p>
        <strong>
          {[...Array(5)].map((_, index) => (
            <IoIosStar key={index} size={27} className={`star ${index < rating ? "active" : ""}`} onClick={() => handleStarClick(index)} />
          ))}
        </strong>
      </div>
    </div>
  );
};

export default Raiting;
