import React, { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useRest } from '@/Context/REST-Context';
interface Props {
}

const TransactionsTable: FC<Props> = () => {
    const [rowsCount, setRowsCount] = useState()
    const [maxPageNumber, setMaxPageNumber] = useState(0);
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            description: 'This column has a value getter and is not sortable.',
            width: 220,
        },
        {
            field: 'userId',
            headerName: 'User Id',
            description: 'This column has a value getter and is not sortable.',
            width: 220,
        },
        {
            field: 'cardType',
            headerName: 'Card Type',
            description: 'This column has a value getter and is not sortable.',
            width: 150,
        },
        {
            field: 'cardNumber',
            headerName: 'Card Number',
            description: 'This column has a value getter and is not sortable.',
            width: 150,
        },
        {
            field: 'totalAmount',
            headerName: 'Total Amount',
            type: 'number',
            description: 'This column has a value getter and is not sortable.',
            width: 110,
        },
        {
            field: 'formattedDate',
            headerName: 'Date',
            description: 'This column has a value getter and is not sortable.',
            width: 150,
        },
    ];
    const {GetTransactionsAmount, GetTransactionsPagination} = useRest();
    const modifyRows = (list) => {
        const modifiedRows = list.map((row) => {
            return {
                userId: row.userId,
                id: row._id,
                cardNumber: row.cardNumber,
                cardType: row.cardType,
                totalAmount: row.totalAmount,
                formattedDate: row.formattedDate,
            };
        });
        return modifiedRows
    }
    const handlePaginationChange = async (params: { pageSize: number, page: number }) => {
        const {page } = params;
        if (page > maxPageNumber) {
            console.log('made api call');
            setIsLoading(true)
            const { list } = await GetTransactionsPagination(page);
            const modifiedRows = modifyRows(list)
            const updatedList = [...rows, ...modifiedRows];
            setRows(updatedList)
            setMaxPageNumber(page)
            setIsLoading(false)
        
        }

        // if page is > than max page:
        //1 set is loading true
        //2 set max page number to page 
        //3 bring more transactions from the server.
        //4 update the rows state,
        //5 set is loading to false

    }
useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true)
        const rowsAmount = await GetTransactionsAmount();
        setRowsCount(rowsAmount)
        const { list } = await GetTransactionsPagination(0);
        setRows(modifyRows(list))
        setIsLoading(false)
    }
    fetchData();
}, [])


return (
    <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            rowCount={rowsCount}
            loading={isLoading}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            disableRowSelectionOnClick
            onPaginationModelChange={handlePaginationChange}
        />
    </Box>
);
};

export default TransactionsTable;