import React, { FC } from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../Components/sidenav/Side-nav';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';
interface Props {
}

const AdminPage: FC<Props> = () => {

    return (
        <>
        <Box sx={{ display: 'flex' }}>
       <SideNav header='Admin'/>
       <Box component="main" sx={{ flexGrow: 1, p:6,marginTop:5}}>
       </Box>
       </Box>
   </>
    );
};

export default AdminPage;