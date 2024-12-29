import Lottie from "lottie-react";
import confetti from "../../../../public/confetti.json";
import "./confetti.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectedConfitti,
  setConfitti,
} from "../../../app/features/RaitingStarsSlice";

const Confetti = () => {
  const dispatch = useAppDispatch();
  const confitti = useAppSelector(selectedConfitti);

  const handleAnimationComplete = () => {
    dispatch(setConfitti());
  };

  return (
    <>
      {confitti && (
        <div className="confetti">
          <Lottie
            animationData={confetti}
            loop={false}
            onComplete={handleAnimationComplete}
          />
        </div>
      )}
    </>
  );
};

export default Confetti;
