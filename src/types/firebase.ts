export type Category = {
  id: string;
  name: string;
  displayOrder: number;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  categoryId: string;
  displayOrder: number;
};
