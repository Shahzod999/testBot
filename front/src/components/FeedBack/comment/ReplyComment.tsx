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
        <p>{reply?.message}</p>

        {reply?.message.length > 90 && (
          <span onClick={toggleOpen}>{open ? t("collapse") : t("more")}</span>
        )}
      </div>
    </div>
  );
};

export default ReplyComment;
