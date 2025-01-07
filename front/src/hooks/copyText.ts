import { useState } from "react";
import { hapticVibration } from "./hapticVibration";
import { errorToast } from "../app/features/toastSlice";
import { useAppDispatch } from "./reduxHooks";

export const useCopyAddress = () => {
  const [copyed, setCopyed] = useState<string | null>(null);
  const [copyAdress, setCopyAdress] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleCopyAdress = (copy: string, type: string) => {
    const textToCopy = copy;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Текст скопирован в буфер обмена");
        hapticVibration("success", "light");
        handleCopy("Текст скопирован", type);
      })
      .catch((error) => {
        dispatch(errorToast("Error"));
        console.error("Не удалось скопировать текст: ", error);
        hapticVibration("success", "light");
        handleCopy("Не удалось скопировать", type);
      });
  };

  const handleCopy = (text: string, type: string) => {
    if (type === "adress") {
      setCopyAdress(text);
    } else {
      setCopyed(text);
    }

    const timer = setTimeout(() => {
      setCopyed(null);
      setCopyAdress(null);
    }, 3000);

    return timer;
  };

  return { copyed, copyAdress, handleCopyAdress };
};
