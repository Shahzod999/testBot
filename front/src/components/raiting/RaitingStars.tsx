import { IoIosStar } from "react-icons/io";

interface RaitingProps {
  count: number;
  handleStarClick?: (index: number) => void;
}

const RaitingStars = ({ count, handleStarClick }: RaitingProps) => {
  return (
    <strong>
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <IoIosStar size={25} className={`star ${index < count ? "active" : ""}`} onClick={() => handleStarClick?.(index)} />
        </div>
      ))}
    </strong>
  );
};

export default RaitingStars;
