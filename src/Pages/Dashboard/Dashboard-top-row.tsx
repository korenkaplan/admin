import { FC, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TopRowCard from './UI Comps/Top-row-card';
import PercentIcon from '@mui/icons-material/Percent';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
interface Props {
}

const DashboardTopRow: FC<Props> = () => {
    const classes = useStyles();

  return (
    <div className={classes.topRow}>
                        <TopRowCard 
                        themeColor='#DA1135'
                         icon={<PersonAddAlt1Icon sx={{color:'white'}} />}
                         header='Users'
                         number={8500}
                         isMoney={false}
                         percentages={10}
                         timePeriod='month'
                         isPercentagesPositive={true}
                          />
                        <TopRowCard 
                        themeColor='#07A503'
                         icon={<StoreIcon sx={{color:'white'}} />}
                         header='Revenue'
                         number={34000}
                         isMoney={true}
                         percentages={1.4}
                         timePeriod='week'
                         isPercentagesPositive={true}
                          />
                         <TopRowCard 
                        themeColor='#529ADC'
                         icon={<PercentIcon sx={{color:'white'}} />}
                         header='Avg Sale'
                         number={69.5}
                         isMoney={true}
                         percentages={1.4}
                         timePeriod='week'
                         isPercentagesPositive={false}
                          />
                         <TopRowCard 
                        themeColor='#DAA211'
                         icon={<ShoppingBagIcon sx={{color:'white'}} />}
                         header='Transactions'
                         number={2000}
                         isMoney={false}
                         percentages={5}
                         timePeriod='week'
                         isPercentagesPositive={true}
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