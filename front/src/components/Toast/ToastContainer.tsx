import { useEffect, useRef } from "react";
import { Toast } from "../../app/features/toastSlice";

const ToastContainer = ({ toast }: { toast: Toast }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toastRef.current) {
        toastRef.current.classList.add("hideToast");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={toastRef} className={`toast-container ${toast.state}`}>
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
