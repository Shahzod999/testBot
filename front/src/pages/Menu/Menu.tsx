import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./menu.scss";
import { useEffect } from "react";

const Menu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.BackButton.show();
    const handleBackClick = () => {
      navigate(-1);
    };
    tg.BackButton.onClick(handleBackClick);

    return () => {
      tg.BackButton.offClick(handleBackClick);
    };
  }, [pathname]);

  return (
    <div className="menuWrapper">
      <Outlet />
    </div>
  );
};

export default Menu;
