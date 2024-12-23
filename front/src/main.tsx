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
        path: "/edit",
        element: <EditPage />,
      },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome />,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
