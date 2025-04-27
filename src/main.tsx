import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "./components/ui/provider.tsx";
import QRCodePage from "./pages/admin/qr/index.tsx";
import HomePage from "./pages/home/index.tsx";
import { AuthProvider } from "./contexts/auth.tsx";
import LoginPage from "./pages/login/index.tsx";
import RequireAuth from "./layouts/requireAuth/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "/admin/qr",
    element: (
      <RequireAuth>
        <QRCodePage />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
