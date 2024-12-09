import { useState } from "react";
import { selectedCompany } from "../../../app/features/companyStateSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import RaitingStars from "../RaitingStars";
import AddFoto from "./AddFoto";
import SendButton from "./SendButton";
import TextArea from "./TextArea";
import BottomSheet from "../../Actions/BottomSheet";
import {
  selectedRaitingCount,
  setCountRaiting,
} from "../../../app/features/RaitingStarsSlice";
import { useSendCommentByCompanyMutation } from "../../../app/api/companySlice";
import { selectedCompanyId } from "../../../app/features/getCompanyIdSlice";
import { errorToast, succesToast } from "../../../app/features/toastSlice";

interface AddCommentProps {
  openComment: boolean;
  toggleComment: () => void;
}

const AddComment = ({ openComment, toggleComment }: AddCommentProps) => {
  const dispatch = useAppDispatch();
  const [imagesArray, setimagesArray] = useState<string[]>([]);
  const [textArea, setTextArea] = useState("");

  const companyInfo = useAppSelector(selectedCompany);
  const count = useAppSelector(selectedRaitingCount);
  const [sendCommentByCompany, { isLoading: sendCommentLoading }] =
    useSendCommentByCompanyMutation();
  const companyId = useAppSelector(selectedCompanyId);

  const handleStarClick = (index: number) => {
    dispatch(setCountRaiting(index + 1));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendComment = {
      message: textArea,
      images: [
        "/images/truegis/8f039cf4-f0eb-436e-93b8-51b284eca884.jpg",
        "/images/truegis/8f039cf4-f0eb-436e-93b8-51b284eca884.jpg",
      ],
      rating: count,
    };
    try {
      const res = await sendCommentByCompany({
        id: companyId,
        data: sendComment,
      }).unwrap();
      dispatch(succesToast("Коментарии добавлен"));
      setTextArea("");
      console.log(res);
    } catch (error) {
      dispatch(errorToast("Ошибка при добавлении комментария"));
      console.log(error);
    }
  };

  return (
    <BottomSheet isOpen={openComment} onClose={toggleComment}>
      <div className="commentsHolder">
        <form className="addComment" onSubmit={handleSubmit}>
          <div className="addComment__title">
            <h2>Оставьте отзыв</h2>
          </div>
          <div className="addComment__info">
            <h2>{companyInfo?.name}</h2>
            <p className="adress">{companyInfo?.address}</p>
          </div>
          <div className="raiting__set">
            <p>Нажмите, чтобы оценить:</p>
            <RaitingStars count={count} handleStarClick={handleStarClick} />
          </div>
          <TextArea text={textArea} setText={setTextArea} />
          <AddFoto
            imagesArray={imagesArray}
            setimagesArray={setimagesArray}
            id="addComments"
          />
          <button type="submit">
            <SendButton
              text="Ваша оценка и отзыв будут видны всем"
              disabled={sendCommentLoading}
            />
          </button>
        </form>
      </div>
    </BottomSheet>
  );
};

export default AddComment;
