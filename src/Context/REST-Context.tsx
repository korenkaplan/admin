import { DashboardTopRowDto } from '@/Pages/Dashboard/Dashboard-dto';
import { LoginDto } from '@/Pages/Login/Login-Dto';
import React, { createContext, useContext,ReactNode } from 'react';

interface RestContextType {
    GetDashboardTopRowStats: () => Promise<DashboardTopRowDto>;
}

const RestContext = createContext<RestContextType | undefined>(undefined);

interface RestProviderProps {
  children: ReactNode; // Define children prop type
}

export const RestProvider: React.FC<RestProviderProps> = ({ children }) => {

const GetDashboardTopRowStats = async():Promise<DashboardTopRowDto> => {
//TODO:  get dashboard top row stats from the server
}
const values = {
    GetDashboardTopRowStats
}
  return (
    <RestContext.Provider value={values}>
      {children}
    </RestContext.Provider>
  );
};

export const useRestContext = (): RestContextType => {
  const context = useContext(RestContext);
  if (!context) {
    throw new Error('useRestContext must be used within an RestProvider');
  }
  return context;
};
