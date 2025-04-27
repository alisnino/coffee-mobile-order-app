import { useEffect, useState } from "react";
import { Product, Category } from "../../types/firebase";
import { fetchMasterData } from "../../utils/firebase";
import { Flex, Text, Separator } from "@chakra-ui/react";
import ProductCard from "../../components/product-card";
import ProductModal from "../../components/product-modal";

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      gap={"2rem"}
      w="calc(100% - 4rem)"
      h="100%"
      p="2rem"
      backgroundColor="gray.100"
      borderRadius="1rem"
    >
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {}}
          initialQty={1}
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
                />
              ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default HomePage;
