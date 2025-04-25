import { useEffect, useState } from "react";
import { Product, Category } from "../../types/firebase";
import { fetchMasterData } from "../../utils/firebase";
import { Flex, Text, Image } from "@chakra-ui/react";
const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { categories, products } = await fetchMasterData();

      console.log(categories, products);

      setCategories(categories);
      setProducts(products);
    };
    fetchData();
  }, []);

  return (
    <Flex flexDirection="column" gap={"2rem"}>
      {categories.map((category) => (
        <Flex
          flexDirection="column"
          gap={"1rem"}
          key={`category-${category.id}`}
        >
          <Text>{category.name}</Text>
          {products
            .filter((product) => product.categoryId === category.id)
            .map((product) => (
              <Flex key={`product-${product.id}`}>
                <Image src={product.image} alt={product.name} />
                <Text key={product.id}>{product.name}</Text>
              </Flex>
            ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default HomePage;
