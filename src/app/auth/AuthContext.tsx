import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null, authenticated: boolean | null };
    onRegister: (email: string, password: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;
}

const TOKEN_KEY = 'token';
export const AUTH_URL = 'urlDaApi';
const AuthContext = createContext<AuthProps>({
    onRegister: function (email: string, password: string): Promise<any> {
        throw new Error("Function not implemented.");
    },
    onLogin: function (email: string, password: string): Promise<any> {
        throw new Error("Function not implemented.");
    },
    onLogout: function (): Promise<any> {
        throw new Error("Function not implemented.");
    }
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({ token, authenticated: true });
            } else {
                setAuthState({ token: null, authenticated: false });
            }
        }
        loadToken();
    }, [])

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${AUTH_URL}/register`, { email, password });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${AUTH_URL}/login`, { email, password });

            setAuthState({ token: result.data.token, authenticated: true });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({ token: null, authenticated: false });
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};