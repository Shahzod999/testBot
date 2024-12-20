import { useRef } from "react";
import { Toast } from "../../app/features/toastSlice";

const ToastContainer = ({ toast }: { toast: Toast }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={toastRef} className={`toast-container ${toast.state}`}>
      <div className="check__text">
        <h2>{toast.text}</h2>
      </div>
    </div>
  );
};

export default ToastContainer;
