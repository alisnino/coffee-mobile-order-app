import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth";
import Spinner from "../../components/spinner";
import { useEffect } from "react";
import Header from "../../components/header";
import { Flex } from "@chakra-ui/react";
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
    <Flex
      flexDirection="column"
      width="100%"
      minWidth="100vw"
      height="100%"
      minHeight="100vh"
      backgroundColor="orange.100"
      alignItems="center"
      justifyContent="center"
    >
      <Header />
      {children}
    </Flex>
  );
};

export default RequireAuth;
