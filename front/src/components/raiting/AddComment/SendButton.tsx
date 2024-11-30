import CommonButton from "../../Actions/CommonButton";

const SendButton = ({ text }: { text: string }) => {
  return (
    <div className="sendButton">
      <p>{text}</p>
      {/* <p>Ваша оценка и отзыв будут видны всем</p> */}
      <CommonButton>
        <span>Отправить</span>
      </CommonButton>
    </div>
  );
};

export default SendButton;
