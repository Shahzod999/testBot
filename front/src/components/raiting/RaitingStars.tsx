import { IoIosStar } from "react-icons/io";
import { hapticVibration } from "../../hooks/hapticVibration";

interface RaitingProps {
  count: number;
  handleStarClick?: (index: number) => void;
}

const RaitingStars = ({ count, handleStarClick }: RaitingProps) => {
  const starClick = (index: number) => {
    handleStarClick?.(index);
    hapticVibration("light");
  };

  return (
    <strong>
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <IoIosStar
            size={25}
            className={`star ${index < count ? "active" : ""}`}
            onClick={() => starClick(index)}
          />
        </div>
      ))}
    </strong>
  );
};

export default RaitingStars;
