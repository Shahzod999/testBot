import "./toast.scss"

import { useEffect } from "react";
import { removeToast, selectToastMessage } from "../../app/features/toastSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const Toast = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectToastMessage);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(removeToast());
      }, 150000); // Убираем тост через 3 секунды
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleRemoveToast = () => {
    dispatch(removeToast());
  };

  console.log(message);

  if (!message) return null;
  return (
    <div className="square">
      <div className="square__box">
        <div className="square__box__text">
          <div className={`toast-container ${message.state}`}></div>
          <h3>Заявка отправлена</h3>
          <p>{message.text}</p>
        </div>

        <button onClick={handleRemoveToast}>Понятно</button>
      </div>
    </div>
  );
};

export default Toast;
