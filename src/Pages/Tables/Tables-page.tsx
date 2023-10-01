import React, { FC } from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../Components/sidenav/Side-nav';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';
import TransactionsTable from './Tables Components/Transactions-table';

interface Props {
}

const TablesPage: FC<Props> = () => {

    return (
        <>
             <Box sx={{ display: 'flex' }}>
            <SideNav/>
            <Box component="main" sx={{ flexGrow: 1, p:6,}}>
                   <DirectoryHeader header="Tables"/>
                   <div>
                    <h3>Transactions Table</h3>
                   <TransactionsTable/>    
                   </div>
            </Box>
            </Box>
        </>
    );
};

export default TablesPage;