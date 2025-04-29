import { useEffect, useMemo, useState } from "react";
import { Product, Category, OrderItem } from "../../types/firebase";
import { fetchMasterData } from "../../utils/firebase";
import { Flex, Text, Separator } from "@chakra-ui/react";
import ProductCard from "../../components/product-card";
import ProductModal from "../../components/product-modal";
import CartFooter from "../../components/cart-footer";
import { headerHeight, cartFooterHeight } from "../../utils/const";

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const selectedProductQty = useMemo(() => {
    return (
      orderItems.find((item) => item.productId === selectedProduct?.id)
        ?.quantity || 0
    );
  }, [selectedProduct, orderItems]);

  const orderItemWithNames = useMemo(() => {
    return orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product && product.name) {
        return {
          productName: product.name,
          quantity: item.quantity,
        };
      } else {
        return {
          productName: "Product not found",
          quantity: item.quantity,
        };
      }
    });
  }, [orderItems, products]);

  const updateOrderItems = (productId: string, quantity: number) => {
    if (quantity > 0) {
      const existingItem = orderItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        setOrderItems((prev) =>
          prev.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        );
      } else {
        setOrderItems((prev) => [...prev, { productId, quantity }]);
      }
    } else {
      setOrderItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { categories, products } = await fetchMasterData();

      setCategories(categories);
      setProducts(products);
    };
    fetchData();
  }, []);

  return (
    <Flex
      flexDirection="column"
      w="100%"
      h="100%"
      p={`calc(${headerHeight} + 1rem) 2rem calc(${cartFooterHeight} + 1rem) 2rem`}
    >
      <Flex
        flexDirection="column"
        gap={"2rem"}
        w="100%"
        h="100%"
        p="1rem 2rem"
        backgroundColor="gray.100"
        borderRadius="1rem"
      >
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={updateOrderItems}
            initialQty={selectedProductQty}
          />
        )}
        {categories.map((category) => (
          <Flex
            flexDirection="column"
            gap={"1rem"}
            key={`category-${category.id}`}
          >
            <Text fontSize="1.5rem" fontWeight="bold">
              {category.name}
            </Text>
            <Separator />
            <Flex flexDirection="row" gap={"1rem"} wrap="wrap">
              {products
                .filter((product) => product.categoryId === category.id)
                .map((product) => (
                  <ProductCard
                    key={`product-${product.id}`}
                    product={product}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    quantity={
                      orderItems.find((item) => item.productId === product.id)
                        ?.quantity
                    }
                  />
                ))}
            </Flex>
          </Flex>
        ))}
        <CartFooter onConfirm={() => {}} orderItems={orderItemWithNames} />
      </Flex>
    </Flex>
  );
};

export default HomePage;
