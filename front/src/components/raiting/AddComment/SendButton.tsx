import CommonButton from "../../Actions/CommonButton";

const SendButton = () => {
  return (
    <div className="sendButton">
      <p>Ваша оценка и отзыв будут видны всем</p>

      <CommonButton>
        <span>Отправить</span>
      </CommonButton>
    </div>
  );
};

export default SendButton;
