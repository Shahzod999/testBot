import { useEffect, useRef } from "react";
import { Toast, removeToast } from "../../app/features/toastSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

const ToastContainer = ({ toast }: { toast: Toast }) => {
  const dispatch = useAppDispatch();
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toastRef.current) {
        toastRef.current.classList.add("hideToast");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={toastRef} className={`toast-container ${toast.state}`}>
      {/* <span>{toast.text}</span> */}
      {/* <span className="toast-close" onClick={() => dispatch(removeToast(toast.id))}>
        ✖
      </span> */}
      <div className="check__svg">
        <img src="./check.png" alt="" />
      </div>
      <div className="check__text">
        <h2>{toast.text}</h2>
      </div>
    </div>
  );
};

export default ToastContainer;
