import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "./components/ui/provider.tsx";
import QRCodePage from "./pages/admin/qr/index.tsx";
import HomePage from "./pages/home/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin/qr",
    element: <QRCodePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
