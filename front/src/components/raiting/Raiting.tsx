import { useState } from "react";
import "./raiting.scss";
import { IoIosStar } from "react-icons/io";
import AddComment from "./AddComment/AddComment";
import RaitingStars from "./RaitingStars";
import { CompanyState } from "../../app/types/companyType";
import { selectedRaitingCount, setCountRaiting } from "../../app/features/RaitingStarsSlice";
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
  };

  return (
    <>
      <div className="raiting">
        <div className="raiting__count">
          <p>
            На основе {companyInfo.review_count} отзывов людей из <a href={companyInfo.reviews_link}>Google</a>
          </p>
          <strong>
            <IoIosStar size={27} />
            {companyInfo?.rating}
          </strong>
        </div>

        <div className="raiting__set" onClick={toggleComment}>
          <p>Нажмите, чтобы оценить:</p>
          <RaitingStars count={count} handleStarClick={handleStarClick} />
        </div>
      </div>

      <AddComment openComment={openComment} toggleComment={toggleComment} />
    </>
  );
};

export default Raiting;
