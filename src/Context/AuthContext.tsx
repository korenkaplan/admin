import { LoginDto } from '@/Pages/Login/Login-Dto';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loginAttempt: (dto:LoginDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; // Define children prop type
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const loginAttempt = async (dto:LoginDto): Promise<void> => {
    console.log(dto);
    //TODO: Make api request to the server 
  }
  const logout = ():void => {
    setAuthenticated(false);
     localStorage.removeItem('token');
  }
  const values = {
    loginAttempt,
    authenticated,
    setAuthenticated,
    logout,
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
