import { ReactNode, useState } from "react";
import "./DropDownMenu.scss";
import { ReactSVG } from "react-svg";

interface DropDownMenuProps {
  toggle: ReactNode;
  menu: ReactNode;
  notAwalible?: boolean;
}
const DropDownMenu = ({ toggle, menu, notAwalible }: DropDownMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleTogle = () => {
    if (notAwalible) return;
    setOpen(!open);
  };
  return (
    <div className={`dropdownMenuHolder ${open ? "deleteAfter" : ""}`}>
      <div className="dropdown__toggle" onClick={handleTogle}>
        <div className="dropdown__toggle__main">{toggle}</div>

        {!notAwalible && (
          <span
            className={`dropdown__icon ${open ? "dropdown__icon--open" : ""}`}>
            <ReactSVG
              src="./arrows/arrowDown.svg"
              className="actions__arrowRight"
            />
          </span>
        )}
      </div>
      <div className={`dropdown__menu ${open ? "dropdown__menu--open" : ""}`}>
        {menu}
      </div>
    </div>
  );
};

export default DropDownMenu;
