// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Product } from "../types/firebase";
import { Category } from "../types/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWTBOtLWhJNosSq-gH0kJewEDv_-o2H1c",
  authDomain: "coffee-mobile-order-app.firebaseapp.com",
  projectId: "coffee-mobile-order-app",
  storageBucket: "coffee-mobile-order-app.firebasestorage.app",
  messagingSenderId: "651679037341",
  appId: "1:651679037341:web:19ca702c3edcb65b38e174",
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
