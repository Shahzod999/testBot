import { selectedCompany } from "../../../app/features/companyStateSlice";
import { useAppSelector } from "../../../hooks/reduxHooks";
import RaitingStars from "../RaitingStars";
import AddFoto from "./AddFoto";
import Cross from "./Cross";
import SendButton from "./SendButton";
import TextArea from "./TextArea";

interface AddCommentProps {
  openComment: boolean;
  toggleComment: () => void;
}

const AddComment = ({ openComment, toggleComment }: AddCommentProps) => {
  const companyInfo = useAppSelector(selectedCompany);

  return (
    <div className={`commentsHolder ${openComment ? "commentsHolder--active" : "commentsHolder--deActive"}`}>
      <div className={`addComment`}>
        <div className="addComment__title">
          <h2>Оставьте отзыв</h2>
          <Cross toggleComment={toggleComment} />
        </div>

        <div className="addComment__info">
          <h2>{companyInfo?.name}</h2>
          <p className="adress">{companyInfo?.address}</p>
        </div>

        <RaitingStars />
        <TextArea />
        <AddFoto />
        <SendButton />
      </div>
    </div>
  );
};

export default AddComment;
