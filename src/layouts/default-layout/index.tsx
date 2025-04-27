import { Flex } from "@chakra-ui/react";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
      {children}
    </Flex>
  );
};

export default DefaultLayout;
