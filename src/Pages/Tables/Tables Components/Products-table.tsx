import { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useRest } from '@/Context/REST-Context';
import { IItem,  ItemTableRow } from '@/Utils/Global-interfaces';
interface Props {
}

const TransactionsTable: FC<Props> = () => {
    const [rowsCount, setRowsCount] = useState<number>()
    const [maxPageNumber, setMaxPageNumber] = useState(0);
    const [rows, setRows] = useState<ItemTableRow[]>([])
    const { GetItemsCount, GetItemsPagination } = useRest();
    const [isLoading, setIsLoading] = useState(false);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            description: 'This column has a value getter and is not sortable.',
            width: 220,
        },
        {
            field: 'name',
            headerName: 'Name',
            description: 'This column has a value getter and is not sortable.',
            width: 160,
        },
        {
            field: 'category',
            headerName: 'Category',
            description: 'This column has a value getter and is not sortable.',
            width: 120,
        },


        {
            field: 'fabric',
            headerName: 'Fabric',
            description: 'This column has a value getter and is not sortable.',
            width: 120,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            description: 'This column has a value getter and is not sortable.',
            width: 120,
        },
        {
            field: 'season',
            headerName: 'Season',
            description: 'This column has a value getter and is not sortable.',
            width: 120,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            description: 'This column has a value getter and is not sortable.',
            width: 120,
        },
    ];
    const modifyRows = (list: IItem[]): ItemTableRow[] => {
        const modifiedRows: ItemTableRow[] = list.map((row) => {
            return {
                id: row._id,
                name: row.name,
                price: row.price,
                category: row.category,
                fabric: row.fabric,
                gender: row.gender,
                season: row.season,
            };
        });
        return modifiedRows;
    }


    const handlePaginationChange = async (params: { pageSize: number, page: number }) => {
        const { page } = params;
        if (page > maxPageNumber) {
            console.log('made api call');
            setIsLoading(true)
            const { list } = await GetItemsPagination(page);
            const modifiedRows = modifyRows(list)
            const updatedList = [...rows, ...modifiedRows];
            setRows(updatedList)
            setMaxPageNumber(page)
            setIsLoading(false)

        }
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const rowsAmount = await GetItemsCount();
            setRowsCount(rowsAmount)
            const {list} = await GetItemsPagination(0);
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
                            pageSize: 5,
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