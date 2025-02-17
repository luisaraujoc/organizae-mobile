// authContext.tsx - Gerencia a autenticação
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const API_URL = "https://organizae-f7aca8e7f687.herokuapp.com/";
const api = axios.create({ baseURL: API_URL });

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  signup: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    if (accessToken) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      try {
        const { data } = await api.get("/me");
        setUser(data);
      } catch (err) {
        await refreshAccessToken(refreshToken);
      }
    }
    setLoading(false);
  };

  const refreshAccessToken = async (refreshToken: string | null) => {
    try {
      const { data } = await api.post("/refresh", { refresh: refreshToken });
      await AsyncStorage.setItem("access_token", data.access);
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      logout();
    }
  };
  const login = async (email: string, senha: string) => {
    try {
      const { data } = await api.post("users/login", { email, senha });
  
      if (data.status !== "sucesso") {
        throw new Error(`Falha no login: ${data.mensagem}`);
      }
  
      const { access_token, refresh_token } = data.data;
  
      if (!access_token || !refresh_token) {
        throw new Error("Tokens não retornados pela API");
      }
  
      await AsyncStorage.multiSet([
        ["access_token", access_token],
        ["refresh_token", refresh_token],
      ]);
  
      api.defaults.headers.Authorization = `Bearer ${access_token}`;
  
      router.replace("/grupos/group");
  
      return true; 
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false; 
    }
  };
  

  const signup = async (nome: string, email: string, senha: string) => {
    try {
      const formData = new FormData();
      // formData.append("imagem", null);
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("senha", senha);

      await api.post("users/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.replace("/auth/signin");
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    router.replace("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};