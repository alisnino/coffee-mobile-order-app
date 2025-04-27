import { useAuth } from "../../contexts/auth";
import { Flex, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex flexDirection="column" gap={"2rem"}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Flex>
  );
};

export default LoginPage;
