import { createRoot } from "react-dom/client";
import "./assets/sass/index.scss";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import MainPage from "./pages/MainPage/MainPage.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.tsx";
import EditPage from "./pages/Edit/EditPage.tsx";
import NotFoundPage from "./pages/SmallPages/404/NotFoundPage.tsx";
import Welcome from "./pages/SmallPages/welComePages/Welcome.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import SingleMenu from "./pages/Menu/SingleMenu/SingleMenu.tsx";
import TotalMenu from "./pages/Menu/TotalMenu/TotalMenu.tsx";
import "./app/utils/i18n.ts";

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "edit",
        element: <EditPage />,
      },
      {
        path: "menu",
        element: <Menu />,
        children: [
          {
            path: "",
            element: <TotalMenu />,
          },
          {
            path: ":id",
            element: <SingleMenu />,
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
