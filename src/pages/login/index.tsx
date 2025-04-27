import { useAuth } from "../../contexts/auth";
import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const LoginPage: React.FC = () => {
  const { user, loginStatus, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === "success" && user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user, navigate, loginStatus]);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex
        flexDirection="column"
        gap={"2rem"}
        w="100%"
        h="100%"
        maxWidth={{ base: "100%", md: "20rem" }}
        maxHeight={{ base: "100%", md: "25rem" }}
        backgroundColor="white"
        borderRadius="1rem"
        padding="2rem"
        alignItems="center"
        justifyContent="center"
      >
        <>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loginStatus === "success" || loginStatus === "loading"}
            color="black"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginStatus === "success" || loginStatus === "loading"}
            color="black"
          />
          {loginStatus === "error" && (
            <Text color="red">Invalid email or password</Text>
          )}
          {loginStatus === "success" && (
            <Text color="green">Login successful! Please wait...</Text>
          )}
          <Button onClick={handleLogin} loading={loginStatus === "loading"}>
            Login
          </Button>
        </>
      </Flex>
    </>
  );
};

export default LoginPage;
