import "./comment.scss";
import { useState, useEffect, useRef } from "react";
import { SingleComment } from "../../../app/types/commentType";
import RaitingStars from "../../raiting/RaitingStars";
import useTimeAgo from "../../../hooks/useTimeAgo";

const Comment = ({ comment }: { comment: SingleComment }) => {
  const [open, setOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const timeAgo = useTimeAgo(comment?.user?.updated_at);
  const textRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (textRef.current) {
      const isOverflow = textRef.current.scrollHeight > textRef.current.offsetHeight;
      setIsOverflowing(isOverflow);
    }
  }, [comment?.message]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="comment">
      <div className="comment__title">
        <div className="comment__title__img">
          <img src="./defaultCommentImg.png" alt="" />
        </div>
        <div className="comment__title__user">
          <h3>{comment?.user?.telegram_name}</h3>
          <div className="comment__title__user__raiting">
            <div className="raiting__set">
              <RaitingStars count={comment?.rating} />
            </div>
          </div>
        </div>
        <span className="comment__title__ago">{timeAgo}</span>
      </div>

      <div className={`comment__box ${open ? "comment__text" : "comment__closeText"}`}>
        <p ref={textRef}>{comment?.message}</p>
        {isOverflowing && !open && <span onClick={toggleOpen}>{open ? "Свернуть" : "Ещё"}</span>}
        {open && <span onClick={toggleOpen}>Свернуть</span>}
      </div>
    </div>
  );
};

export default Comment;
