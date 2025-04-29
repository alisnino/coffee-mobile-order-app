import { Button, Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import { cartFooterHeight } from "../../utils/const";
type CartFooterProps = {
  onConfirm: () => void;
  orderItems: {
    productName: string;
    quantity: number;
  }[];
};

const CartFooter: React.FC<CartFooterProps> = ({
  onConfirm,
  orderItems = [],
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsConfirmModalOpen(false);
  };

  return (
    <Flex
      css={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "gray.100",
        width: "100%",
        height: cartFooterHeight,
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Dialog.Root
        open={isConfirmModalOpen}
        onOpenChange={(e) => setIsConfirmModalOpen(e.open)}
      >
        <Dialog.Trigger asChild>
          <Button>注文確認</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Your Order</Dialog.Header>
              <Dialog.Body>
                {orderItems.map((item) => (
                  <Flex key={item.productName} gap="1rem">
                    <Text>{item.productName}:</Text>
                    <Text>{item.quantity}</Text>
                  </Flex>
                ))}
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  onClick={handleConfirm}
                  disabled={orderItems.length === 0}
                >
                  送信
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Flex>
  );
};

export default CartFooter;
