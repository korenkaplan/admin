/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TopRowCard from './UI Comps/Top-row-card';
import PercentIcon from '@mui/icons-material/Percent';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { GraphStats, TopRowCardGraphData, TransactionGraphStats, ZeroData } from './Dashboard-dto';
interface Props {
  usersData:GraphStats| ZeroData ,
  transactionsData:TransactionGraphStats| ZeroData
}

const DashboardTopRow: FC<Props> = ({usersData,transactionsData}) => {
    const classes = useStyles();
    const [usersCardData, setUsersCardData] = useState<TopRowCardGraphData[]>([])
    const [revenueCardData, setRevenueCardData] = useState<TopRowCardGraphData[]>([])
    const [countCardData, setCountCardData] = useState<TopRowCardGraphData[]>([])
    const [averageCardData, setAverageCardData] = useState<TopRowCardGraphData[]>([])
    const [usersAmount, setUsersAmount] = useState(0)
    const [revenueAmount, setRevenueAmount] = useState(0)
    const [countAmount,setCountAmount] = useState(0)
    const [averageAmount,setAverageAmount] = useState(0)

    const initUsersCardData = () => {
      const data:TopRowCardGraphData[] = usersData.monthly.map((data) =>{
        return {value: data.value}
      })
      const total = usersData.yearly.reduce((prev, curr) => prev + curr.value, 0);
      setUsersCardData(data)
      setUsersAmount(total)
    }
    const initRevenueCardData = () => {
      const data:TopRowCardGraphData[] = transactionsData.monthly.map((data) =>{
        return {value: data.value}
      })
      const total = transactionsData.yearly.reduce((prev, curr) => prev + curr.value, 0);
      setRevenueCardData(data)
      setRevenueAmount(total)
    }
    const initCountCardData = () =>{
      const data:TopRowCardGraphData[] = transactionsData.monthly.map((data) =>{
        return {value: data.count}
      })
      const total = transactionsData.yearly.reduce((prev, curr) => prev + curr.count, 0);
      setCountCardData(data)
      setCountAmount(total)

    }
    const initAverageCardData =() =>{
      const data:TopRowCardGraphData[] = [];
      let totalValue = 0;
      let totalCount = 0;
      const length  = transactionsData.monthly.length
      for(let i = 0; i < length; i++){
        const value = transactionsData.monthly[i].value;
        const count = transactionsData.monthly[i].count;
        totalValue += value;
        totalCount += count;
        if(count > 0 )
        {
          const average = Math.floor(value / count);
          data.push({value: average})
        }
        else
        data.push({value:0})
        
      }
      setAverageCardData(data)
      if(totalCount > 0)
      setAverageAmount(Math.floor(totalValue / totalCount))
      else
      setAverageAmount(0)
    }
    useEffect(() => {
      initUsersCardData()
      initRevenueCardData()
      initAverageCardData()
      initCountCardData();
    }, [transactionsData, usersData])
    return (
    <div className={classes.topRow}>
                        <TopRowCard 
                        themeColor='#DA1135'
                         icon={<PersonAddAlt1Icon sx={{color:'white'}} />}
                         header='Users'
                         number={usersAmount}
                         isMoney={false}
                         data={usersCardData}
                          />
                        <TopRowCard 
                        themeColor='#07A503'
                         icon={<StoreIcon sx={{color:'white'}} />}
                         header='Revenue'
                         number={revenueAmount}
                         isMoney={true}
                         data={revenueCardData}
                          />
                         <TopRowCard 
                        themeColor='#529ADC'
                         icon={<PercentIcon sx={{color:'white'}} />}
                         header='Avg Sale'
                         number={averageAmount}
                         isMoney={true}
                         data={averageCardData}
                          />
                         <TopRowCard 
                        themeColor='#DAA211'
                         icon={<ShoppingBagIcon sx={{color:'white'}} />}
                         header='Transactions'
                         number={countAmount}
                         isMoney={false}
                         data={countCardData}
                          />
                   </div>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    topRow:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
  }))
export default DashboardTopRow;