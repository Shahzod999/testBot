interface TextProps {
  text: string;
  setText: (e: string) => void;
}

const TextArea = ({ text, setText }: TextProps) => {
  const maxLength = 50; // Максимальная длина текста

  // Функция для определения текущего состояния
  const getProgressState = () => {
    const length = text.trim().length;

    if (length === 0) return { state: "low", width: 0 };
    if (length < 10) return { state: "low", width: (length / maxLength) * 100 };
    if (length < 30) return { state: "medium", width: (length / maxLength) * 100 };
    if (length < 50) return { state: "nice", width: (length / maxLength) * 100 };
    return { state: "good", width: 100 };
  };

  const progress = getProgressState();

  return (
    <div className="addComment__textArea">
      <textarea
        rows={5}
        placeholder="Расскажите нам про это место"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="addComment__textArea__progress">
        <div className="progress-indicator">
          <div
            className={`progress-bar ${progress.state}`}
            style={{ width: `${progress.width}%` }}
          ></div>
        </div>
        <p className="progress-message">
          {progress.state === "good"
            ? "Замечательно. Вы достигли максимума!"
            : "Добавьте ещё символы, чтобы улучшить текст."}
        </p>
      </div>
    </div>
  );
};

export default TextArea;
