import { useState } from "react";
import { useGetCommentsbyCompanyQuery } from "../../app/api/companySlice";
import { selectedCompanyId } from "../../app/features/getCompanyIdSlice";
import { SingleComment } from "../../app/types/commentType";
import { useAppSelector } from "../../hooks/reduxHooks";
import Comment from "./comment/Comment";
import "./feedBack.scss";
import { useTranslation } from "react-i18next";

const FeedBack = () => {
  const [end, setEnd] = useState(true);
  const [limit, setLimit] = useState(3);
  const companyId = useAppSelector(selectedCompanyId);
  const { data, isFetching } = useGetCommentsbyCompanyQuery({
    id: companyId,
    limit,
  });
  const { t } = useTranslation();

  const limitHandler = () => {
    if (data?.pagination?.pages <= 1) {
      return setEnd(false);
    }
    setLimit(limit + 3);
  };

  const closeComments = () => {
    setLimit(3);
    setEnd(true);
    window.location.href = "#feedBack";
  };

  const total = data?.pagination?.total;
  console.log(data);

  if (!total) return;

  return (
    <div className="feedBack" id="feedBack">
      <h2>{t("feedbackTitle")}</h2>
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

      {total > 3 && (
        <>
          {end ? (
            <span className="feedBack__more" onClick={limitHandler}>
              {isFetching ? t("loading") : t("readMore")}
            </span>
          ) : (
            <span className="feedBack__more" onClick={closeComments}>
              {t("collapse")}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default FeedBack;
