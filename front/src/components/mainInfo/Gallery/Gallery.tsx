import { useState } from "react";
import BottomSheet from "../../Actions/BottomSheet";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div onClick={handleOpen} className="gallery">
        <h2>Галерея заведения</h2>
      </div>
      <BottomSheet isOpen={open} onClose={handleClose}>
        Hello
      </BottomSheet>
    </>
  );
};

export default Gallery;
