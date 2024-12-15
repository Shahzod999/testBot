interface TextProps {
  text: string;
  setText: (e: string) => void;
}

const TextArea = ({ text, setText }: TextProps) => {
  const maxLength = 50; 

  const getProgressState = () => {
    const length = text.trim().length;

    if (length === 0)
      return { state: "low", width: 0, text: "Это слишком коротко." };
    if (length < 10)
      return {
        state: "low",
        width: (length / maxLength) * 100,
        text: "Это слишком коротко.",
      };
    if (length < 30)
      return {
        state: "medium",
        width: (length / maxLength) * 100,
        text: "Это слишком коротко.",
      };
    if (length < 50)
      return {
        state: "nice",
        width: (length / maxLength) * 100,
        text: "Выглядит хорошо. Добавьте ещё несколько слов.",
      };
    return {
      state: "good",
      width: 100,
      text: "Замечательно. Поделитесь своим опытом.",
    };
  };

  const progress = getProgressState();

  return (
    <div className="addComment__textArea">
      <textarea
        rows={5}
        placeholder="Расскажите нам про это место"
        value={text}
        onChange={(e) => setText(e.target.value)}></textarea>

      <div className="addComment__textArea__progress">
        <div className="progress-indicator">
          <div
            className={`progress-bar ${progress.state}`}
            style={{ width: `${progress.width}%` }}></div>
        </div>
        <p className="progress-message">{progress.text}</p>
      </div>
    </div>
  );
};

export default TextArea;
