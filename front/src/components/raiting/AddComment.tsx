import { useState } from "react";
import { selectedCompany } from "../../app/features/companyStateSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import RaitingStars from "./RaitingStars";

const AddComment = () => {
  const companyInfo = useAppSelector(selectedCompany);
  const [text, setText] = useState("");

  const getProgressState = () => {
    const length = text.length;

    if (length === 0)
      return { state: "empty", message: "Поле не заполнено", level: -1 };
    if (length < 10)
      return { state: "low", message: "Слишком мало текста", level: 0 };
    if (length < 30)
      return {
        state: "medium",
        message: "Неплохо, но можно подробнее",
        level: 1,
      };
    if (length < 50)
      return {
        state: "nice",
        message: "Текст достаточно хороший",
        level: 2,
      };
    return { state: "good", message: "Отличный текст", level: 3 };
  };

  const progress = getProgressState();

  return (
    <div className="addComment">
      <div className="addComment__title">
        <h2>Оставьте отзыв</h2>
        <span>
          <img src="./cross.svg" alt="" />
        </span>
      </div>

      <div className="addComment__info">
        <h2>{companyInfo?.name}</h2>
        <p className="adress">{companyInfo?.address}</p>
      </div>

      <RaitingStars />

      <div className="addComment__textArea">
        <textarea
          rows={5}
          placeholder="Расскажите нам про это место"
          value={text}
          onChange={(e) => setText(e.target.value)}></textarea>

        <div className="addComment__textArea__progress">
          <div className="progress-indicator">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`progress-line ${
                  index <= progress.level ? "active" : ""
                }`}></div>
            ))}
          </div>
          <p className={`progress-message ${progress.state}`}>
            {progress.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
