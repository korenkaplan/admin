import { FC } from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../Components/sidenav/Side-nav';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';
import TransactionsTable from './Tables Components/Transactions-table';
import ProductsTable from './Tables Components/Products-table';

interface Props {
}

const TablesPage: FC<Props> = () => {

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav header='Tables' />
                <Box component="main" sx={{ flexGrow: 1, p: 6,marginTop:5 }}>
                    <div>
                        <h3>Products Table</h3>
                        <ProductsTable />
                    </div>
                    <div>
                        <h3>Transactions Table</h3>
                        <TransactionsTable />
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default TablesPage;