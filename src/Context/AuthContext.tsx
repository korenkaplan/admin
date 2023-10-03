import { LoginDto } from '@/Pages/Login/Login-Dto';
import axios, { AxiosInstance } from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {useNavigate} from 'react-router-dom';

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loginAttempt: (dto: LoginDto) => Promise<boolean>;
  logout: () => void;
  setToken: React.Dispatch<React.SetStateAction<string| null>>;
  token:string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; // Define children prop type
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const api: AxiosInstance = axios.create({
    baseURL: 'https://scan-and-go.onrender.com', // Set your base URL
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const loginAttempt = async (dto: LoginDto): Promise<boolean> => {
    const { email, password, rememberMe } = dto;

    try {
      const response = await api.post('/auth/loginAdmin', { email, password });

      const token = response.data.token;

      if (rememberMe) 
        localStorage.setItem('token', token);

      setToken(token);
      setAuthenticated(true);
      return true;
   } catch (error: any) {
    console.error(error.message)
    return false;
  }

}
const logout = (): void => {
  setAuthenticated(false);
  localStorage.removeItem('token');
}
const values = {
  loginAttempt,
  authenticated,
  setAuthenticated,
  logout,
  setToken,
  token,
}

return (
  <AuthContext.Provider value={values}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
