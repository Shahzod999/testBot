import { ReactNode, useState } from "react";
import "./DropDownMenu.scss";
import { ReactSVG } from "react-svg";

interface DropDownMenuProps {
  toggle: ReactNode;
  menu: ReactNode;
}
const DropDownMenu = ({ toggle, menu }: DropDownMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdownMenuHolder">
      <div className="dropdown__toggle" onClick={() => setOpen(!open)}>
        {toggle}
        <span className={`dropdown__icon ${open ? "dropdown__icon--open" : ""}`}>
          <ReactSVG
            src="./arrows/arrowDown.svg"
            className="actions__arrowRight"
          />
        </span>
      </div>
      <div className={`dropdown__menu ${open ? "dropdown__menu--open" : ""}`}>
        {menu}
      </div>
    </div>
  );
};

export default DropDownMenu;
