import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import HomePage from "./pages/home-page/home-page.tsx";
import BasketPage from "./pages/basket-page/basket-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <span>Error! 404 Page</span>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "basket",
        element: <BasketPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
