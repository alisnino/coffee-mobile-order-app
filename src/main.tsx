import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/index/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "./components/ui/provider.tsx";
import QRCodePage from "./pages/admin/qr/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
