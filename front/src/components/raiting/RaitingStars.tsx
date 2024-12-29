import { IoIosStar } from "react-icons/io";

interface RaitingProps {
  count: number;
  handleStarClick?: (index: number) => void;
}

const RaitingStars = ({ count, handleStarClick }: RaitingProps) => {

  const starClick = (index: number) => {
    handleStarClick?.(index);
    handleHaptic();
  };

  const handleHaptic = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
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
