import { useState, useEffect } from "react";
import { Product } from "../../types/firebase";
import {
  Button,
  Dialog,
  Portal,
  Text,
  Flex,
  CloseButton,
  Box,
} from "@chakra-ui/react";

export type ProductModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productId: string, quantity: number) => void;
  initialQty: number;
};

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
  initialQty,
}) => {
  const [quantity, setQuantity] = useState(initialQty);

  useEffect(() => {
    setQuantity(initialQty);
  }, [initialQty]);

  const handleConfirm = () => {
    onConfirm(product.id, quantity);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Box
                css={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "10rem",
                  maxHeight: "10rem",
                }}
              />
            </Dialog.Header>
            <Dialog.Body>
              <Flex
                css={{
                  flexDirection: "column",
                  height: "fit-content",
                  maxHeight: "12rem",
                  paddingX: "0.5rem",
                }}
              >
                <Text
                  css={{
                    height: "2rem",
                    minHeight: "2rem",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#000",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name}
                </Text>
                <Text
                  css={{
                    fontSize: "0.8rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "4rem",
                    maxHeight: "4rem",
                  }}
                >
                  {product.description}
                </Text>
                <Flex alignItems="center" gap="0.5rem">
                  <Button
                    variant="outline"
                    onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                  >
                    -
                  </Button>
                  <Text>{quantity}</Text>
                  <Button
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleConfirm}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger top="0" insetEnd="-12" asChild>
              <CloseButton bg="bg" size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default ProductModal;
