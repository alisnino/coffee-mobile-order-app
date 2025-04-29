import {
  Button,
  Flex,
  Drawer,
  Portal,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import { useMemo } from "react";
import { headerHeight } from "../../utils/const";
import { FaBars } from "react-icons/fa6";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const greetingMessage = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
      return "Good Morning!";
    } else if (hours < 18) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Flex
      css={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "gray.100",
        width: "100%",
        height: headerHeight,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button height="100%" width="2rem" unstyled>
            <Flex justifyContent="center" alignItems="center">
              <Text as={FaBars} />
            </Flex>
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>{greetingMessage}</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Flex flexDirection="column" gap={2}>
                  <Button onClick={logout}>Logout</Button>
                </Flex>
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Flex>
  );
};

export default Header;
