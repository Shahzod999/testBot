import { useEffect, useState } from "react";
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
import {
  useSendCommentByCompanyMutation,
  useUploadImageMutation,
} from "../../../app/api/companySlice";
import {
  errorToast,
  infoToast,
  succesToast,
} from "../../../app/features/toastSlice";
import { ErrorComment } from "../../../app/types/commentType";
import { PhotosSample } from "../../../app/types/companyType";
import { toggleLoading } from "../../../app/features/bottomSheetSlice";
import { useTranslation } from "react-i18next";

interface AddCommentProps {
  openComment: boolean;
  toggleComment: () => void;
}

const AddComment = ({ openComment, toggleComment }: AddCommentProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [imagesArray, setimagesArray] = useState<PhotosSample[]>([]);
  const [textArea, setTextArea] = useState("");
  const count = useAppSelector(selectedRaitingCount);
  const companyInfo = useAppSelector(selectedCompany);
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();
  const [sendCommentByCompany, { isLoading: sendCommentLoading }] =
    useSendCommentByCompanyMutation();

  const handleStarClick = (index: number) => {
    dispatch(setCountRaiting(index + 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textArea || !count) {
      return dispatch(infoToast(t("fillAllFields")));
    }
    dispatch(toggleLoading(true));

    try {
      const uploadedUrls = await Promise.all(
        imagesArray.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file.file);
          formData.append("page", "truegis");
          const response = await uploadImage(formData).unwrap();

          return {
            url: response.image,
            thumbnail: response.thumbnail,
          };
        }),
      );

      if (!uploadedUrls.length) {
        return dispatch(infoToast(t("addAtLeastOneImage")));
      }

      const sendComment = {
        message: textArea,
        images: uploadedUrls.map((item) => item.url),
        thumbnails: uploadedUrls.map((item) => item.thumbnail),
        rating: count,
      };

      await sendCommentByCompany({
        id: companyInfo?._id || "",
        data: sendComment,
      }).unwrap();

      dispatch(succesToast(t("commentAdded")));
      setTextArea("");
      setimagesArray([]);
      toggleComment();
    } catch (error) {
      const er = error as ErrorComment;
      dispatch(errorToast(er.data?.message || t("errorSendingComment")));
    } finally {
      dispatch(toggleLoading(false));
    }
  };
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (openComment) {
      tg.BackButton.show();

      const handleBackClick = () => {
        toggleComment();
      };
      tg.BackButton.onClick(handleBackClick);

      return () => {
        tg.BackButton.offClick(handleBackClick);
      };
    } else if (!openComment) {
      tg.BackButton.hide();
    }
  }, [openComment, toggleComment]);

  return (
    <BottomSheet isOpen={openComment} onClose={toggleComment}>
      <div className="commentsHolder">
        <form className="addComment" onSubmit={handleSubmit}>
          <div className="addComment__title">
            <h2>{t("leaveReview")}</h2>
          </div>
          <div className="addComment__info">
            <h2>{companyInfo?.name}</h2>
            <p className="adress">{companyInfo?.address}</p>
          </div>
          <div className="raiting__set">
            <RaitingStars count={count} handleStarClick={handleStarClick} />
          </div>

          <TextArea text={textArea} setText={setTextArea} count={count} />

          <AddFoto
            imagesArray={imagesArray}
            setimagesArray={setimagesArray}
            id="addComments"
            maxLength
          />
          <SendButton
            text={t("yourRatingReviewVisible")}
            disabled={sendCommentLoading || uploading}
          />
        </form>
      </div>
    </BottomSheet>
  );
};

export default AddComment;
