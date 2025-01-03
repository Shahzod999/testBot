import { Outlet } from "react-router-dom";
import "./menu.scss";

const Menu = () => {
  return (
    <div className="menuWrapper">
      <Outlet />
    </div>
  );
};

export default Menu;
