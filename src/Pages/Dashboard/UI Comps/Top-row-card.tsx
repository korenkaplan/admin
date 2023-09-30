import React, { FC } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';

interface Props {
    themeColor: string;
    header: string;
    icon: React.ReactNode
    number: number;
    isMoney:boolean
    percentages: number
    isPercentagesPositive: boolean
    timePeriod:string
}

const TopRowCard: FC<Props> = ({themeColor,header,icon,number,isMoney,percentages,timePeriod,isPercentagesPositive}) => {
  const classes = useStyles();
  const iconDivStyle = {
    backgroundColor: themeColor, 
    width: '50px',
    height: '50px',
    display: 'flex',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '5px 6px 8px rgba(0, 0, 0, 0.2)', 
  };
  const containerStyle = {
      width:'250px',
      border: `1px solid ${themeColor}`,
      borderRadius: 10,
      boxShadow: '5px 6px 8px rgba(0, 0, 0, 0.2)', 
      background: `linear-gradient(135deg, white 40%, ${themeColor} 100%)`, // Add linear gradient background
  }
  const formatNumber = (num:number):string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num.toString();
    }
  };
  return (
    <div style={containerStyle} >
      <div className={classes.topRow}>
          <div style={iconDivStyle}>
           {icon}
          </div>
          <div className={classes.headersDiv}>
            <Typography sx={{fontWeight:'300'}}>{header}</Typography>
            <Typography sx={{fontWeight:'bold'}} >{formatNumber(number)} {isMoney ? '$' : ''}</Typography>
          </div>
      </div>
      <Divider sx={{width:'90%',margin:'auto'}}/>
      <div className={classes.bottomRow}>
      <Typography sx={{fontWeight:'bold',color:isPercentagesPositive?'green':'red'}}>{isPercentagesPositive? '+': '-'}{percentages}%</Typography>
      <Typography sx={{fontWeight:'300'}}> Than last {timePeriod}</Typography>
      </div>
    </div>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    text:{
      fontFamily:'italic',
      fontWeight:'300'
    },
    textBold:{
      fontWeight:'bold'
    },
    bottomRow:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'space-around',
      alignItems:'center',
      padding:10

    },
    headersDiv:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center'
    },
    container:{
      width:'250px',
      border: '1px solid',
      borderRadius: 10,
      background: 'linear-gradient(130deg, #FE6B8B 30%, #FF8E53 90%)', // Add linear gradient background
    },
    topRow:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:15

    },
  }))
export default TopRowCard;