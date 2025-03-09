import React, { memo, useEffect, useState } from "react";
import "./bottomSheet.scss";
import CompanyLink from "../CompanyLink/CompanyLink";
import { useLocation } from "react-router-dom";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = memo(({ isOpen, onClose, children }: BottomSheetProps) => {
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
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      tg.BackButton.show();
      const handleBackClick = () => {
        onClose();
      };
      tg.BackButton.onClick(handleBackClick);
      return () => {
        tg.BackButton.offClick(handleBackClick);
      };
    } else {
      if (pathname == "/") {
        tg.BackButton.hide();
      }
      document.body.style.overflow = "";
    }
  }, [isOpen]);

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
        <div className="bottom-sheet__companyLink">
          <div className="bottom-sheet__companyLink-box">
            <CompanyLink />
          </div>
        </div>
      </div>
    </>
  );
});

export default BottomSheet;
