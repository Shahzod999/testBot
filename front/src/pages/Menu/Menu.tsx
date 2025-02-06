import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./menu.scss";
import { useEffect } from "react";

const Menu = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  console.log(pathname);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.BackButton.show();
    const handleBackClick = () => {
      if (id) {
        navigate("/menu");
      } else if (pathname == "/menu") {
        navigate("/");
      } else {
        navigate(-1);
      }
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
