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
import Snowfall from "react-snowfall";

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
        path: "welcome",
        element: <Welcome />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Snowfall
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        opacity: 0.5,
      }}
    />

    <RouterProvider router={router} />
  </Provider>,
);
