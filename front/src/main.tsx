import { createRoot } from "react-dom/client";
import "./assets/sass/index.scss";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import MainPage from "./pages/MainPage/MainPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.tsx";
import EditPage from "./pages/Edit/EditPage.tsx";
import NotFoundPage from "./pages/SmallPages/404/NotFoundPage.tsx";
import Welcome from "./pages/SmallPages/welComePages/Welcome.tsx";
// import Snowfall from "react-snowfall";
import Confetti from "./pages/SmallPages/welComePages/Confetti.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import SingleMenu from "./pages/Menu/SingleMenu/SingleMenu.tsx";
import TotalMenu from "./pages/Menu/TotalMenu/TotalMenu.tsx";
import LoadingScreen from "./pages/SmallPages/Loading/LoadingScreen.tsx";
import "./app/utils/i18n.ts";

const router = createBrowserRouter([
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
        path: "/menu",
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <Snowfall
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
      snowflakeCount={50}
      speed={[1, 2]}
      opacity={[0.5, 1]}
      radius={[0.5, 2]}
      wind={[0, 1]}
    /> */}
    <LoadingScreen />
    <Confetti />
    <RouterProvider router={router} />
  </Provider>,
);
