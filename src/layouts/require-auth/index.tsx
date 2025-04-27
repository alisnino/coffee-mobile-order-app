import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth";
import Spinner from "../../components/spinner";
import { useEffect } from "react";
import Header from "../../components/header";
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loginStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus !== "loading" && !user) {
      navigate("/login");
    }
  }, [user, loginStatus, navigate]);

  if (loginStatus === "loading" || !user) {
    return <Spinner />;
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RequireAuth;
