import { useState } from "react";
import "./raiting.scss";
import { IoIosStar } from "react-icons/io";
import AddComment from "./AddComment/AddComment";
import RaitingStars from "./RaitingStars";
import { CompanyState } from "../../app/types/companyType";
import {
  selectedRaitingCount,
  setCountRaiting,
} from "../../app/features/RaitingStarsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const Raiting = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const dispatch = useAppDispatch();
  const [openComment, setOpenCommet] = useState(false);
  const count = useAppSelector(selectedRaitingCount);

  const toggleComment = () => {
    if (!openComment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setOpenCommet(!openComment);
  };

  const handleStarClick = (index: number) => {
    dispatch(setCountRaiting(index + 1));
    handleHaptic();
  };

  const handleHaptic = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
  };

  const handleOrder = () => {
    window.open(companyInfo.reviews_link);
  };

  return (
    <>
      <div className="raiting">
        <div className="raiting__count">
          <p>
            На основе {companyInfo.review_count} отзывов людей из{" "}
            <span onClick={handleOrder}>Google</span>
          </p>
          <strong>
            <IoIosStar size={27} />
            {companyInfo?.rating || "0"}
          </strong>
        </div>

        <div className="raiting__set" onClick={toggleComment}>
          <RaitingStars count={count} handleStarClick={handleStarClick} />
        </div>
      </div>

      <AddComment openComment={openComment} toggleComment={toggleComment} />
    </>
  );
};

export default Raiting;
