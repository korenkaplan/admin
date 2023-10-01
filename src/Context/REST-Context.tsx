import { DashboardTopRowDto } from '@/Pages/Dashboard/Dashboard-dto';
import { LoginDto } from '@/Pages/Login/Login-Dto';
import React, { createContext, useContext,ReactNode } from 'react';
import axios from 'axios';
interface RestContextType {
    GetDashboardTopRowStats: () => Promise<DashboardTopRowDto>;
    GetTransactionsPagination:(pageNumber: number) => Promise<any>;
    GetTransactionsAmount:() => Promise<any>;
}

const RestContext = createContext<RestContextType | undefined>(undefined);

interface RestProviderProps {
  children: ReactNode; // Define children prop type
}

export const RestProvider: React.FC<RestProviderProps> = ({ children }) => {

const GetDashboardTopRowStats = async():Promise<DashboardTopRowDto> => {
//TODO:  get dashboard top row stats from the server
}
const GetTransactionsAmount = async () => {
  try {
      const res = await axios.get('https://scan-and-go.onrender.com/transactions/transactionsAmount')
      return res.data
  } catch (error: any) {
      alert(error.response.data.message)
  }

}
const GetTransactionsPagination = async (pageNumber: number) => {
  const requestBody = {
      currentPage: pageNumber,
      query:
      {

      },
      projection:
      {

          "products": 0,
          "schemaVersion": 0,
          "__v": 0,
          "createdAt": 0
      }
  }
  try {
      const response = await axios.post('https://scan-and-go.onrender.com/transactions/getManyPaginationAdmin', requestBody);
      return response.data


  } catch (error: any) {
      alert(error.response.data.message)
  }
}
const values = {
    GetDashboardTopRowStats,
    GetTransactionsPagination,
    GetTransactionsAmount
}
  return (
    <RestContext.Provider value={values}>
      {children}
    </RestContext.Provider>
  );
};

export const useRest = (): RestContextType => {
  const context = useContext(RestContext);
  if (!context) {
    throw new Error('useRestContext must be used within an RestProvider');
  }
  return context;
};
