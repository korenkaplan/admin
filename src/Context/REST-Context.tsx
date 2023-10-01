/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardTopRowDto } from '@/Pages/Dashboard/Dashboard-dto';
import React, { createContext, useContext,ReactNode } from 'react';
import axios from 'axios';
import { IItem, ITransaction } from '@/Utils/Global-interfaces';
interface RestContextType {
    GetDashboardTopRowStats: () => Promise<DashboardTopRowDto>;
    GetTransactionsPagination:(pageNumber: number) => Promise<ITransaction[]>;
    GetTransactionsAmount:() => Promise<number>;
    GetItemsCount:() => Promise<number>;
    GetItemsPagination:(pageNumber: number) => Promise<IItem[]>;
}

const RestContext = createContext<RestContextType | undefined>(undefined);

interface RestProviderProps {
  children: ReactNode; // Define children prop type
}

export const RestProvider: React.FC<RestProviderProps> = ({ children }) => {

const GetDashboardTopRowStats = async():Promise<DashboardTopRowDto> => {
//TODO:  get dashboard top row stats from the server
throw new Error('not implemented');
}
const GetTransactionsAmount = async () => {
  try {
      const res = await axios.get('https://scan-and-go.onrender.com/transactions/transactionsAmount')
      return res.data 
  } catch (error: any) {
      alert(error.response.data.message)
  }

}
const GetTransactionsPagination = async (pageNumber: number): Promise<ITransaction[]> => {
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
      return response.data as ITransaction[]
  } catch (error: any) {
      alert(error.response.data.message)
      return []
  }
}
const GetItemsCount = async () => {
  try {
      const res = await axios.get('https://scan-and-go.onrender.com/items/itemsCount')
      return res.data 
  } catch (error: any) {
      alert(error.response.data.message)
  }

}
const GetItemsPagination = async (pageNumber: number): Promise<IItem[]> => {
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
      const response = await axios.post('https://scan-and-go.onrender.com/items/getManyPaginationAdmin', requestBody);
      return response.data as IItem[]
  } catch (error: any) {
      alert(error.response.data.message)
      return []
  }
}
const values = {
    GetDashboardTopRowStats,
    GetTransactionsPagination,
    GetTransactionsAmount,
    GetItemsCount,
    GetItemsPagination,

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
