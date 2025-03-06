import { useState } from "react";
import { hapticVibrationByType } from "./hapticVibration";
import { errorToast } from "../app/features/toastSlice";
import { useAppDispatch } from "./reduxHooks";
import { useTranslation } from "react-i18next";

export const useCopyAddress = () => {
  const { t } = useTranslation();
  const [copyed, setCopyed] = useState<string | null>(null);
  const [copyAdress, setCopyAdress] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleCopyAdress = (copy: string, type: string) => {
    const textToCopy = copy;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log(t("textCopied"));
        hapticVibrationByType("success");
        handleCopy(t("textCopied"), type);
      })
      .catch((error) => {
        dispatch(errorToast(t("error")));
        console.error(t("failedToCopy"), error);
        hapticVibrationByType("error");
        handleCopy(t("failedToCopy"), type);
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
