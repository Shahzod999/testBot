import { useState } from "react";
import { IoIosStar } from "react-icons/io";

const RaitingStars = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };
  return (
    <div className="raiting__set">
      <p>Нажмите, чтобы оценить:</p>
      <strong>
        {[...Array(5)].map((_, index) => (
          <div>
            <IoIosStar
              key={index}
              size={25}
              className={`star ${index < rating ? "active" : ""}`}
              onClick={() => handleStarClick(index)}
            />
          </div>
        ))}
      </strong>
    </div>
  );
};

export default RaitingStars;
