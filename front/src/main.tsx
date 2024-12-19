import { createRoot } from "react-dom/client";
import "./assets/sass/index.scss";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import MainPage from "./pages/MainPage/MainPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.tsx";
import EditPage from "./pages/Edit/EditPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <>Error 404</>,
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
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
