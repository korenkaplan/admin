import { FC, useEffect, useState } from 'react';

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
import axios from 'axios';
import { GraphStats, ITopSellingItem, TransactionGraphStats, ZeroData } from './Dashboard-dto';
import CustomLineChart from './UI Comps/Line-chart';
import CustomBarChart from './UI Comps/Bar-chart';
interface Props {
}

const DashboardPage: FC<Props> = () => {
  const ZeroData = {
    weekly:[
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
     
    ],
    monthly:[
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
     
    ],
    yearly:[
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
      {
        value:0,
        count:0
      },
     
     
    ],
  }
  const classes = useStyles();
  const [timePeriod, setTimePeriod] = useState('Monthly')
  const revenueGraphColor = '#07A503';
  const topSellingItemsColor = '#529ADC';
  const usersAmountGraphColor = '#DA1135';
  const transactionsAmountGraphColor = '#DAA211';
  const [transactionsGraphDataState, setTransactionsGraphDataState] = useState<TransactionGraphStats| ZeroData>(ZeroData);
  const [usersGraphDataState, setUsersGraphDataState] = useState<GraphStats | ZeroData>(ZeroData);
  const [topSellsGraphDataState, setTopSellsGraphDataState] = useState<ITopSellingItem[]>([])
  const handleChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };
  const fetchUsersGraphData = async () => {
    const response = await axios.get('https://scan-and-go.onrender.com/site/dashboard/usersStats')
    return response.data
  }
  const fetchTransactionsGraphData = async () => {
    const response = await axios.get('https://scan-and-go.onrender.com/site/dashboard/transactionsStats')
    return response.data
  }
  const fetchTopSellsGraphData = async () => {
    const response = await axios.get('https://scan-and-go.onrender.com/site/dashboard/topSellingItems')
    return response.data
  }
  useEffect(() => {
    const fetchData = async () => {
      const usersGraphData = await fetchUsersGraphData()
      const transactionsGraphData = await fetchTransactionsGraphData()
      const topSellsGraphData = await fetchTopSellsGraphData()
      setTopSellsGraphDataState(topSellsGraphData)
      setTransactionsGraphDataState(transactionsGraphData)
      setUsersGraphDataState(usersGraphData)
    }
    fetchData()
  }, [])
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideNav header='Dashboard' />
        <Box component="main" sx={{ flexGrow: 1, p: 6, marginTop: 8 }}>
          <DashboardTopRow transactionsData={transactionsGraphDataState} usersData={usersGraphDataState} />
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
            <CustomLineChart XAxisDataKey='label' YAxisDataKey='value' header=' Scan & Go Revenue Chart' graphData={transactionsGraphDataState} color={revenueGraphColor} period={timePeriod}/>
            <CustomLineChart XAxisDataKey='label' YAxisDataKey='count' header='Transactions Amount' graphData={transactionsGraphDataState} color={transactionsAmountGraphColor} period={timePeriod}/>
          </div>
          <Divider />
          <div className={classes.secondRowGraphs}>
          <CustomLineChart XAxisDataKey='label' YAxisDataKey='value' header='New Registrations Chart' graphData={usersGraphDataState} color={usersAmountGraphColor} period={timePeriod}/>
          <CustomBarChart YAxisDataKey='name' XAxisDataKey='totalTagsAmount' YAxisType='category' XAxisType='number' header='Top Selling Items'  graphData={topSellsGraphDataState}  layout='vertical' color={topSellingItemsColor}  />
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
      marginTop: 30,
      width: '85%',
      height: '50px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin:'auto',
    },
  }))
export default DashboardPage;

