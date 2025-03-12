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
import { hapticVibration } from "../../hooks/hapticVibration";
import { useTranslation } from "react-i18next";

const Raiting = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const dispatch = useAppDispatch();
  const [openComment, setOpenCommet] = useState(false);
  const count = useAppSelector(selectedRaitingCount);
  const { t } = useTranslation();

  const toggleComment = () => {
    const root = document.getElementById("root")!;

    if (!openComment) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
    }
    setOpenCommet(!openComment);
  };

  const handleStarClick = (index: number) => {
    dispatch(setCountRaiting(index + 1));
    hapticVibration("light");
  };

  const handleOrder = () => {
    window.open(companyInfo.reviews_link);
  };

  return (
    <>
      <div className="raiting">
        <div className="raiting__count">
          <p>
            {t("basedOnReviews", {
              count: companyInfo.review_count,
            })}
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
