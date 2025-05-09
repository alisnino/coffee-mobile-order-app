import React from "react";
import { Product } from "../../types/firebase";
import { Box, Flex, Text } from "@chakra-ui/react";

export type ProductCardProps = {
  product: Product;
  onClick: () => void;
  quantity: number | undefined;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  quantity,
}) => {
  return (
    <Flex
      css={{
        flexDirection: "column",
        width: "100%",
        height: "fit-content",
        maxWidth: "200px",
        maxHeight: "16rem",
        objectFit: "cover",
        border: "1px solid #e0e0e0",
        borderRadius: "0.5rem",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.01)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
      onClick={onClick}
    >
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
      >
        {quantity && (
          <Flex
            css={{
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <Flex
              css={{
                height: "2rem",
                width: "2rem",
                border: "2px solid orange",
                borderRadius: "2rem",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{quantity}</Text>
            </Flex>
          </Flex>
        )}
      </Box>
      <Flex
        css={{
          flexDirection: "column",
          height: "6rem",
          maxHeight: "6rem",
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
      </Flex>
    </Flex>
  );
};

export default ProductCard;
