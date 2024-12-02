import { useState } from "react";
import "./raiting.scss";
import { IoIosStar } from "react-icons/io";
import AddComment from "./AddComment/AddComment";
import RaitingStars from "./RaitingStars";
import { CompanyState } from "../../app/types/companyType";

const Raiting = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [openComment, setOpenCommet] = useState(false);

  const toggleComment = () => {
    if (!openComment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setOpenCommet(!openComment);
  };

  return (
    <>
      <div className="raiting">
        <div className="raiting__count">
          <p>
            На основе {companyInfo.review_count} отзывов людей из{" "}
            <a href={companyInfo.reviews_link}>Google</a>
          </p>
          <strong>
            <IoIosStar size={27} />
            {companyInfo?.rating}
          </strong>
        </div>
        <RaitingStars toggleComment={toggleComment} />
      </div>

      <AddComment openComment={openComment} toggleComment={toggleComment} />
    </>
  );
};

export default Raiting;
