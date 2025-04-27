import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "./components/ui/provider.tsx";
import QRCodePage from "./pages/admin/qr/index.tsx";
import HomePage from "./pages/home/index.tsx";
import { AuthProvider } from "./contexts/auth.tsx";
import LoginPage from "./pages/login/index.tsx";
import RequireAuth from "./layouts/require-auth/index.tsx";
import DefaultLayout from "./layouts/default-layout/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout>
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/qr",
    element: (
      <DefaultLayout>
        <RequireAuth>
          <QRCodePage />
        </RequireAuth>
      </DefaultLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <DefaultLayout>
        <LoginPage />
      </DefaultLayout>
    ),
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
