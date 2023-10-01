import { FC, useState } from 'react';

import SideNav from '../../Components/sidenav/Side-nav';
import Box from '@mui/material/Box';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';
import { makeStyles, createStyles } from '@mui/styles';
import DashboardTopRow from './Dashboard-top-row';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Divider, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RevenueGraph from './Graphs/Revenue-graph';
import TopSellingItems from './Graphs/Top-sellingItems-graph';
import TransactionsAmountGraph from './Graphs/Transactions-amount-graph';
import UsersAmountGraph from './Graphs/Users-amount-graph';
interface Props {
}

const DashboardPage: FC<Props> = () => {
  const classes = useStyles();
  const [timePeriod, setTimePeriod] = useState('Monthly')
  const revenueGraphColor='#07A503';
  const topSellingItemsColor='#529ADC';
  const usersAmountGraphColor='#DA1135';
  const transactionsAmountGraphColor='#DAA211';
  const handleChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };
  
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideNav header='Dashboard' />
        <Box component="main" sx={{ flexGrow: 1, p: 6, marginTop:5}}>
          <DashboardTopRow />
          <div className={classes.periodRow}>
            <div className={classes.iconAndHeader}>
              <CalendarMonthIcon />
              <Typography style={{ marginLeft: 10 }}>  Time period:</Typography>
            </div>
            <div >
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  id="demo-select-small"
                  value={timePeriod}
                  onChange={handleChange}
                  defaultValue={'Monthly'}
                >
                  <MenuItem value='Weekly'>Weekly</MenuItem>
                  <MenuItem value='Monthly'>Monthly</MenuItem>
                  <MenuItem value='Yearly'>Yearly</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.firstRowGraphs}>
            <RevenueGraph color={revenueGraphColor} period={timePeriod}/>
            <TopSellingItems color={topSellingItemsColor} period={timePeriod}/>
          </div>
          <Divider/>
          <div className={classes.secondRowGraphs}>
            <TransactionsAmountGraph color={transactionsAmountGraphColor} period={timePeriod}/>
            <UsersAmountGraph color={usersAmountGraphColor} period={timePeriod}/>
          </div>
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    secondRowGraphs: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    firstRowGraphs: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      
    },

    iconAndHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    periodRow: {
      marginTop: 10,
      width: '100%',
      height: '50px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  }))
export default DashboardPage;