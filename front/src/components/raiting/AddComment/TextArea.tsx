import { useState } from "react";

const TextArea = () => {
  const [text, setText] = useState("");

  const getProgressState = () => {
    const length = text.trim().length;

    if (length === 0) return { state: "empty", message: "Поле не заполнено", level: -1 };
    if (length < 10) return { state: "low", message: "Слишком мало текста", level: 0 };
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
    <div className="addComment__textArea">
      <textarea rows={5} placeholder="Расскажите нам про это место" value={text} onChange={(e) => setText(e.target.value)}></textarea>

      <div className="addComment__textArea__progress">
        <div className="progress-indicator">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`progress-line ${index <= progress.level ? "active" : ""}`}></div>
          ))}
        </div>
        <p className={`progress-message ${progress.state}`}>{progress.message}</p>
      </div>
    </div>
  );
};

export default TextArea;
