import "./comment.scss";
import { useState, useEffect, useRef } from "react";
import { SingleComment } from "../../../app/types/commentType";
import RaitingStars from "../../raiting/RaitingStars";
import useTimeAgo from "../../../hooks/useTimeAgo";
import "swiper/swiper-bundle.css";
import ReplyComment from "./ReplyComment";
import FullScreenImgSwiper from "../../FullScreenImgSwiper/FullScreenImgSwiper";
import {
  popBackButtonHandler,
  pushBackButtonHandler,
} from "../../../app/features/backButtonState";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getValidatedUrl } from "../../../hooks/imgGetValidatedUrl";

const Comment = ({ comment }: { comment: SingleComment }) => {
  const [open, setOpen] = useState(false);
  const [imgOpen, setImgOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const timeAgo = useTimeAgo(comment?.created_at);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [indexImg, setIndexImg] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (textRef.current) {
      const isOverflow =
        textRef.current.scrollHeight > textRef.current.offsetHeight;
      setIsOverflowing(isOverflow);
    }
  }, [comment?.message]);

  useEffect(() => {
    const handleBackButton = () => setImgOpen(false);

    if (imgOpen) {
      dispatch(pushBackButtonHandler({ id: "Comment", callback: handleBackButton }));
    } else {
      dispatch(popBackButtonHandler());
    }

    return () => {
      if (imgOpen) {
        dispatch(popBackButtonHandler());
      }
    };
  }, [imgOpen, dispatch]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleImgOpen = (i: number) => {
    setIndexImg(i);
    setImgOpen(!imgOpen);
  };

  return (
    <div className="comment">
      <div className="comment__title">
        <div className="comment__title__img">
          <img
            src={
              comment.user.telegram_profile_photo?.image
                ? getValidatedUrl(comment.user.telegram_profile_photo?.image)
                : "./defaultCommentImg.png"
            }
            alt=""
          />
        </div>
        <div className="comment__title__user">
          <h3>{comment?.user?.telegram_name}</h3>
          <div className="comment__title__user__raiting">
            <div className="raiting__set">
              <RaitingStars count={comment?.rating} />
            </div>
          </div>
        </div>

        <span className="comment__title__ago">
          {timeAgo}
          {comment.status == "pending" && (
            <div className="pending">
              в ожидании
              <span className="dots"></span>
            </div>
          )}
        </span>
      </div>

      {imgOpen ? (
        <FullScreenImgSwiper
          imgOpen={imgOpen}
          setImgOpen={setImgOpen}
          images={comment?.images}
          indexImg={indexImg}
        />
      ) : (
        <div className="comment__images">
          {comment?.images?.map((item, i) => (
            <div
              className="comment__images__img"
              key={i}
              onClick={() => toggleImgOpen(i)}>
              <img src={getValidatedUrl(item)} alt="" />
            </div>
          ))}
        </div>
      )}

      <div
        className={`comment__box ${
          open ? "comment__text" : "comment__closeText"
        }`}>
        <p ref={textRef}>{comment?.message}</p>
        {isOverflowing && !open && (
          <span onClick={toggleOpen}>{open ? "Свернуть" : "Ещё"}</span>
        )}
        {open && <span onClick={toggleOpen}>Свернуть</span>}
      </div>

      {comment?.replies?.map((item) => (
        <ReplyComment reply={item} key={item.reply_id} />
      ))}
    </div>
  );
};

export default Comment;
