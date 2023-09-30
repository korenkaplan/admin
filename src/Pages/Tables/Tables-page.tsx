import React, { FC } from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../Components/sidenav/Side-nav';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';

interface Props {
}

const TablesPage: FC<Props> = () => {

    return (
        <>
             <Box sx={{ display: 'flex' }}>
            <SideNav/>
            <Box component="main" sx={{ flexGrow: 1, p:6,}}>
                   <DirectoryHeader header="Tables"/>    
            </Box>
            </Box>
        </>
    );
};

export default TablesPage;