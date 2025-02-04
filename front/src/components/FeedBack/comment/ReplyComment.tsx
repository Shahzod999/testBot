import { useState } from "react";
import { Reply } from "../../../app/types/commentType";
import useTimeAgo from "../../../hooks/useTimeAgo";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";

interface ReplyCommentProps {
  reply: Reply;
}

const ReplyComment = ({ reply }: ReplyCommentProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const timeAgo = useTimeAgo(reply?.reply_date);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="comment replyComment">
      <div className="comment__title">
        <div className="comment__title__img">
          <img
            src="https://dev.admin13.uz/images/truegis-default-images/default-avatar.png"
            alt=""
          />
        </div>
        <div className="comment__title__user">
          <h3>{reply.reply_from === "root" ? t("truegisTeam") : t("owner")}</h3>
        </div>
        <span className="comment__title__ago">
          <ReactSVG src="./arrowUturn.svg" />
          {timeAgo}
        </span>
      </div>

      <div
        className={`comment__box ${
          open ? "comment__box__collapse" : "comment__box__more"
        }`}>
        <div className="comment__box__text">
          <p>{reply?.message.split(" ").splice(0, 9).join(" ")} </p>
          <p className="comment__box__closingText">
            {reply?.message.split(" ").splice(9).join(" ")}
          </p>
        </div>

        {reply?.message.length > 90 && (
          <>
            <span onClick={toggleOpen}>{open ? t("collapse") : t("more")}</span>
            {!open && <strong> ...</strong>}
          </>
        )}
      </div>
    </div>
  );
};

export default ReplyComment;
