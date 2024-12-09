import { useState } from "react";
import { useGetCommentsbyCompanyQuery } from "../../app/api/companySlice";
import { selectedCompanyId } from "../../app/features/getCompanyIdSlice";
import { SingleComment } from "../../app/types/commentType";
import { useAppSelector } from "../../hooks/reduxHooks";
import Comment from "./comment/Comment";
import "./feedBack.scss";

const FeedBack = () => {
  const [end, setEnd] = useState(true);
  const [limit, setLimit] = useState(3);
  const companyId = useAppSelector(selectedCompanyId);
  const { data } = useGetCommentsbyCompanyQuery({ id: companyId, limit });

  const limitHandler = () => {
    if (data?.pagination?.pages <= 1) {
      console.log("111");

      return setEnd(false);
    }
    setLimit(limit + 3);
  };

  const closeComments = () => {
    setLimit(1);
    setEnd(true);
    window.location.href = "#feedBack";
  };

  console.log(data, "1111");

  if (!data?.pagination?.total) return;

  return (
    <div className="feedBack" id="feedBack">
      <h2>Отзывы пользователей TrueGis</h2>
      <div className="feedBack__comments__wrapper">
        {data?.data?.map((comment: SingleComment, index: number) => (
          <div
            className="feedBack__comment"
            key={comment._id}
            style={{ animationDelay: `${index * 0.1}s` }}>
            <Comment comment={comment} />
          </div>
        ))}
      </div>

      {end ? (
        <span className="feedBack__more" onClick={limitHandler}>
          Читать далее
        </span>
      ) : (
        <span className="feedBack__more" onClick={closeComments}>
          Свернуть
        </span>
      )}
    </div>
  );
};

export default FeedBack;
