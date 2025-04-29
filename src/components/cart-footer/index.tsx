import {
  Button,
  Dialog,
  Flex,
  Portal,
  Text,
  Separator,
} from "@chakra-ui/react";
import { useState } from "react";
import { Order } from "../../types/firebase";
import { cartFooterHeight } from "../../utils/const";
type CartFooterProps = {
  onConfirm: () => void;
  orderItems: {
    productName: string;
    quantity: number;
  }[];
  errorMessage: string;
  pastOrders: Order[];
};

const CartFooter: React.FC<CartFooterProps> = ({
  onConfirm,
  orderItems = [],
  pastOrders = [],
  errorMessage,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isPastOrdersModalOpen, setIsPastOrdersModalOpen] = useState(false);

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
        open={isPastOrdersModalOpen}
        onOpenChange={(e) => setIsPastOrdersModalOpen(e.open)}
      >
        <Dialog.Trigger asChild>
          <Button>過去の注文</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>過去の注文</Dialog.Header>
              <Dialog.Body>
                {pastOrders.map((order) => (
                  <Flex key={order.id} flexDirection="column" gap="1rem">
                    <Separator />
                    <Text>
                      {order.items.map((item) => (
                        <Flex key={item.productId} gap="1rem">
                          <Text>{item.productId}:</Text>
                          <Text>{item.quantity}</Text>
                        </Flex>
                      ))}
                    </Text>
                  </Flex>
                ))}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Dialog.Root
        open={isConfirmModalOpen}
        onOpenChange={(e) => setIsConfirmModalOpen(e.open)}
      >
        <Dialog.Trigger asChild>
          <Flex flexDirection="row" gap="1rem" alignItems="center">
            {errorMessage && <Text color="red">{errorMessage}</Text>}
            <Button>注文確認</Button>
          </Flex>
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
