import { Flex, Spinner as ChakraSpinner, Text } from "@chakra-ui/react";
const Spinner = () => {
  return (
    <Flex
      css={{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        w: "100%",
        h: "100%",
      }}
    >
      <ChakraSpinner size="xl" color="orange.500" borderWidth="4px" />
      <Text color="orange.500">Loading...</Text>
    </Flex>
  );
};

export default Spinner;
