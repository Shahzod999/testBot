import { IoIosStar } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectedRaitingCount,
  setCountRaiting,
} from "../../app/features/RaitingStarsSlice";

interface RaitingProps {
  toggleComment?: () => void;
}

const RaitingStars = ({ toggleComment }: RaitingProps) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectedRaitingCount);

  const handleStarClick = (index: number) => {
    dispatch(setCountRaiting(index + 1));
  };


  return (
    <div className="raiting__set" onClick={toggleComment}>
      <p>Нажмите, чтобы оценить:</p>
      <strong>
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <IoIosStar
              size={25}
              className={`star ${index < count ? "active" : ""}`}
              onClick={() => handleStarClick(index)}
            />
          </div>
        ))}
      </strong>
    </div>
  );
};

export default RaitingStars;
