import { useState } from "react";
import "./raiting.scss";
import { IoIosStar } from "react-icons/io";
import AddComment from "./AddComment/AddComment";
import RaitingStars from "./RaitingStars";
import { CompanyState } from "../../app/types/companyType";

const Raiting = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [openComment, setOpenCommet] = useState(false);

  const toggleComment = () => {
    setOpenCommet(!openComment);
  };

  return (
    <>
      <div className="raiting" onClick={toggleComment}>
        <div className="raiting__count">
          <p>
            На основе {companyInfo.review_count} отзывов людей из <a href={companyInfo.reviews_link}>Google</a>
          </p>
          <strong>
            <IoIosStar size={27} />
            {companyInfo?.rating}
          </strong>
        </div>
        <RaitingStars />
      </div>

      <AddComment openComment={openComment} toggleComment={toggleComment} />
    </>
  );
};

export default Raiting;
