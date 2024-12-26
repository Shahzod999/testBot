interface TextProps {
  text: string;
  setText: (e: string) => void;
  count: number;
}

const TextArea = ({ text, setText, count }: TextProps) => {
  const maxLength = 120;

  const getProgressState = () => {
    const length = text.trim().length;

    if (length === 0) return { state: "low", width: 0 };
    if (length < 30)
      return {
        state: "low",
        width: (length / maxLength) * 100,
      };
    if (length < 70)
      return {
        state: "medium",
        width: (length / maxLength) * 100,
      };
    if (length < 115)
      return {
        state: "nice",
        width: (length / maxLength) * 100,
      };
    return {
      state: "good",
      width: (length / maxLength) * 100,
    };
  };

  const message = [
    "Кажется, вам тут совсем не понравилось. Что пошло не так?",
    "Не понравилось здесь? Расскажите, что пошло не так?",
    "Кажется, было средне. Расскажите, чего не хватило?",
    "Понравилось здесь? Расскажите, что именно порадовало",
    "Кажется, вы в восторге! Поделитесь, что именно понравилось?",
  ];

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
        <p className="progress-message">Оценка принята. {message[count - 1]}</p>
      </div>
    </div>
  );
};

export default TextArea;
