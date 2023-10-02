import React, { FC } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  const data = [
    {
      pv: 2400,
    },
    {
      pv: 1398,
    },
    {
      pv: 9800,
    },
    {
      pv: 3908,
    },
    {
      pv: 4800,
    },
    {
      pv: 3800,
    },
    {
      pv: 4300,
    },
  ];
  const iconDivStyle = {
    backgroundColor: themeColor, 
    width: '50px',
    height: '50px',
    display: 'flex',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '5px 6px 8px rgba(0, 0, 0, 0.2)',
    position:'absolute',
    top:70,
    left:-15,
  };
  const containerStyle = {
      width:'250px',
      border: `1px solid ${themeColor}`,
      borderRadius: 10,
      boxShadow: '5px 6px 8px rgba(0, 0, 0, 0.2)', 
      background: `linear-gradient(135deg, white 30%, ${themeColor} 90%)`, // Add linear gradient background
      marginLeft:25,
      marginRight:25,
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
          <LineChart width={100} height={50} data={data}>
          <Line dot={false} type="monotone" dataKey="pv" stroke={themeColor} strokeWidth={2} />
      </LineChart>
          <div className={classes.headersDiv}>
            <Typography sx={{fontWeight:'300',color:'#33333'}}>{header}</Typography>
            <Typography sx={{fontWeight:'bold',color:'#33333'}} >{formatNumber(number)} {isMoney ? '$' : ''}</Typography>
          </div>
      </div>
      <Divider sx={{width:'90%',margin:'auto'}}/>
      <div className={classes.bottomRow}>
 
      {/* <Typography sx={{fontWeight:'bold',color:isPercentagesPositive?'green':'red'}}>{isPercentagesPositive? '+': '-'}{percentages}%</Typography>
      <Typography sx={{fontWeight:'300'}}> Than last {timePeriod}</Typography> */}
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
      justifyContent:'flex-start',
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
      margin:20,
    },
    topRow:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:15,
        position: 'relative',

    },
  }))
export default TopRowCard;