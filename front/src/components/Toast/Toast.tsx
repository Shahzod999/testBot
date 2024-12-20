import { useEffect } from "react";
import { removeToast, selectToastMessage } from "../../app/features/toastSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import "./toast.scss";

const Toast = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectToastMessage);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(removeToast());
      }, 1500); // Убираем тост через 3 секунды
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleRemoveToast = () => {
    dispatch(removeToast());
  };

  if (!message) return null; // Если тоста нет, ничего не рендерим

  return (
    <div className="toast-wrapper" onClick={handleRemoveToast}>
      <div className={`toast-container ${message.state}`}>
        <div className="check__text">
          <h2>{message.text}</h2>
        </div>
      </div>
    </div>
  );
};

export default Toast;
