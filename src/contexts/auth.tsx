import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

type LoginStatus = "idle" | "loading" | "success" | "error";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginStatus: LoginStatus;
};

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loginStatus: "loading",
});

// Auth provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoginStatus("success");
      } else {
        setUser(null);
        setLoginStatus("idle");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string) => {
    setLoginStatus("loading");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await auth.authStateReady();
      if (auth.currentUser) {
        setUser(auth.currentUser);
        setLoginStatus("success");
      } else {
        setUser(null);
        setLoginStatus("error");
      }
    } catch (error) {
      console.error(error);
      setLoginStatus("error");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setLoginStatus("idle");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth easily
export const useAuth = () => useContext(AuthContext);
