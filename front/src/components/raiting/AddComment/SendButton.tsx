import CommonButton from "../../Actions/CommonButton";

const SendButton = ({ text, disabled }: { text: string; disabled?: boolean }) => {
  return (
    <div className="sendButton">
      <p>{text}</p>
      <CommonButton disabled={disabled}>
        <span>Отправить</span>
      </CommonButton>
    </div>
  );
};

export default SendButton;
