import { useEffect } from "react";
import {
  executeBackButtonHandler,
  selectBackButtonStack,
} from "../app/features/backButtonState";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const BackButtonManager = () => {
  const dispatch = useAppDispatch();
  const stack = useAppSelector(selectBackButtonStack);

  useEffect(() => {
    if (stack.length > 0) {
      const tg = window.Telegram.WebApp;

      const handleTelegramBackButton = () => {
        dispatch(executeBackButtonHandler());
      };

      tg.BackButton.show();
      tg.BackButton.onClick(handleTelegramBackButton);
    } else {
      window.Telegram.WebApp.BackButton.hide();
    }

    return () => {
      window.Telegram.WebApp.BackButton.offClick(() => {});
    };
  }, [stack]);

  return null;
};

export default BackButtonManager;
