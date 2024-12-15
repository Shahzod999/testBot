import "./comment.scss";
import { useState, useEffect, useRef } from "react";
import { SingleComment } from "../../../app/types/commentType";
import RaitingStars from "../../raiting/RaitingStars";
import useTimeAgo from "../../../hooks/useTimeAgo";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ReplyComment from "./ReplyComment";
// import { Pagination } from "swiper/modules";

const Comment = ({ comment }: { comment: SingleComment }) => {
  const [open, setOpen] = useState(false);
  // const [imgOpen, setImgOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const timeAgo = useTimeAgo(comment?.created_at);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflow =
        textRef.current.scrollHeight > textRef.current.offsetHeight;
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
          <img
            src={
              comment.user.telegram_profile_photo?.image
                ? `https://dev.admin13.uz${comment.user.telegram_profile_photo.image}`
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

      {/* {imgOpen ? (
        <div className="fullScreenImg" onClick={toggleImgOpen}>
          <Swiper
            modules={[Pagination]}
            className="mySwiper"
            pagination={{
              clickable: true,
            }}>
            {comment.images?.map((item, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`https://dev.admin13.uz${item}`}
                  alt="LargePhoto photo"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="comment__images">
          {comment.images.map((item, i) => (
            <div
              className="comment__images__img"
              key={i}
              onClick={toggleImgOpen}>
              <img src={`https://dev.admin13.uz${item}`} alt="" />
            </div>
          ))}
        </div>
      )} */}

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
