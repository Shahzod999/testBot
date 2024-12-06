interface TextProps {
  text: string;
  setText: (e: string) => void;
}

const TextArea = ({ text, setText }: TextProps) => {
  const getProgressState = () => {
    const length = text.trim().length;

    if (length === 0) return { state: "empty", message: "Это слишком коротко.", level: -1 };
    if (length < 10) return { state: "low", message: "Это слишком коротко.", level: 0 };
    if (length < 30)
      return {
        state: "medium",
        message: "Это слишком коротко.",
        level: 1,
      };
    if (length < 50)
      return {
        state: "nice",
        message: "Выглядит хорошо. Добавьте ещё несколько слов.",
        level: 2,
      };
    return { state: "good", message: "Замечательно. Поделитесь своим опытом.", level: 3 };
  };

  const progress = getProgressState();

  return (
    <div className="addComment__textArea">
      <textarea rows={5} placeholder="Расскажите нам про это место" value={text} onChange={(e) => setText(e.target.value)}></textarea>

      <div className="addComment__textArea__progress">
        <div className="progress-indicator">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`progress-line ${index <= progress.level ? progress.state : ""}`}></div>
          ))}
        </div>
        <p className="progress-message">{progress.message}</p>
      </div>
    </div>
  );
};

export default TextArea;
