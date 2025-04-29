// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { CreateOrder, Order, Product } from "../types/firebase";
import { Category } from "../types/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export const fetchMasterData = async () => {
  try {
    const categoriesRef = collection(db, "master_categories");
    const categoriesSnapshot = await getDocs(categoriesRef);
    const categories: Category[] = categoriesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        displayOrder: Number(data.displayOrder),
      };
    });
    const productsRef = collection(db, "master_products");
    const productsSnapshot = await getDocs(productsRef);
    const products: Product[] = productsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        image: data.image,
        description: data.description,
        categoryId: data.categoryId,
        displayOrder: Number(data.displayOrder),
      };
    });

    const imageUrls = await Promise.all(
      products.map(async (product) => {
        const imageRef = ref(storage, product.image);
        const url = await getDownloadURL(imageRef);
        return url;
      })
    );

    const productsWithImageUrls = products.map((product, index) => ({
      ...product,
      image: imageUrls[index],
    }));

    return { categories, products: productsWithImageUrls };
  } catch (error) {
    console.error(error);
    return { categories: [], products: [] };
  }
};

export const createOrder = async (order: CreateOrder) => {
  try {
    const ordersRef = collection(db, "orders");
    const orderDoc = await addDoc(ordersRef, order);
    return orderDoc.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPastOrders = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("orderDate", ">=", new Date(new Date().setHours(0, 0, 0, 0)))
    );
    const ordersSnapshot = await getDocs(q);
    const orders: Order[] = ordersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        items: data.items,
        orderDate: data.orderDate,
        status: data.status,
      };
    });
    return orders;
  } catch (error) {
    console.error(error);
    return [];
  }
};
