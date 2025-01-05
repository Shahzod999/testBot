import React, { memo, useEffect, useState } from "react";
import "./bottomSheet.scss";
import CompanyLink from "../CompanyLink/CompanyLink";
import {
  popBackButtonHandler,
  pushBackButtonHandler,
} from "../../app/features/backButtonState";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = memo(({ isOpen, onClose, children }: BottomSheetProps) => {
  const dispatch = useAppDispatch();
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const touchY = e.touches[0].clientY;
    setCurrentY(touchY);
    if (touchY - startY > 0) {
      setIsDragging(true);
    }
  };

  const handleTouchEnd = () => {
    if (startY !== null && currentY !== null && currentY - startY > 100) {
      handleClose();
    }

    setStartY(null);
    setCurrentY(null);
    setIsDragging(false);
  };

  const handleClose = () => {
    onClose();

    dispatch(popBackButtonHandler());
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(pushBackButtonHandler({ id: "bottomSheet", callback: onClose }));
    } else {
      dispatch(popBackButtonHandler());
    }

    return () => {
      dispatch(popBackButtonHandler());
    };
  }, [isOpen, dispatch]);

  return (
    <>
      <div
        className={`bottom__wrapper ${isOpen ? "bottom__wrapper--active" : ""}`}
        onClick={handleClose}></div>

      <div
        className={`bottom-sheet ${isOpen ? "bottom-sheet--open" : ""} ${
          isDragging ? "bottom-sheet--dragging" : ""
        }`}
        draggable={false}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div className="bottom-sheet__content">
          <div className="bottom-sheet__close" onClick={handleClose}>
            <div></div>
          </div>
          {children}
        </div>
        <CompanyLink />
      </div>
    </>
  );
});

export default BottomSheet;
