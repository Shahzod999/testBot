import { useState } from "react";
import { selectedCompany } from "../../../app/features/companyStateSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import RaitingStars from "../RaitingStars";
import AddFoto from "./AddFoto";
import Cross from "./Cross";
import SendButton from "./SendButton";
import TextArea from "./TextArea";
import BottomSheet from "../../Actions/BottomSheet";
import { selectedRaitingCount, setCountRaiting } from "../../../app/features/RaitingStarsSlice";

interface AddCommentProps {
  openComment: boolean;
  toggleComment: () => void;
}

const AddComment = ({ openComment, toggleComment }: AddCommentProps) => {
  const dispatch = useAppDispatch();
  const [imagesArray, setimagesArray] = useState<string[]>([]);
  const companyInfo = useAppSelector(selectedCompany);
  const count = useAppSelector(selectedRaitingCount);

  const handleStarClick = (index: number) => {
    dispatch(setCountRaiting(index + 1));
  };

  return (
    <BottomSheet isOpen={openComment} onClose={toggleComment}>
      <div className="commentsHolder">
        <div className="addComment">
          <div className="addComment__title">
            <h2>Оставьте отзыв</h2>
            <Cross toggleComment={toggleComment} />
          </div>

          <div className="addComment__info">
            <h2>{companyInfo?.name}</h2>
            <p className="adress">{companyInfo?.address}</p>
          </div>

          <div className="raiting__set">
            <p>Нажмите, чтобы оценить:</p>
            <RaitingStars count={count} handleStarClick={handleStarClick} />
          </div>

          <TextArea />

          <AddFoto imagesArray={imagesArray} setimagesArray={setimagesArray} id="addComments" />

          <SendButton text="Ваша оценка и отзыв будут видны всем" />
        </div>
      </div>
    </BottomSheet>
  );
};

export default AddComment;
