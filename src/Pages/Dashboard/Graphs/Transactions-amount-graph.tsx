import React, { FC,  useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { GraphStats, ZeroData } from '../Dashboard-dto';
interface Props {
  period:string
  color:string
  graphData:GraphStats | ZeroData
}

const TransactionsAmountGraph: FC<Props> = ({period,color,graphData}) => {
  const classes = useStyles();
  const WeeklyData = [
    {
      title: "Sun",
      value: 140,
    },
    {
      title: "Mon",
      value: 270,
    },
    {
      title: "Tue",
      value: 260,
    },
    {
      title: "Wed",
      value: 120,
    },
    {
      title: "Thu",
      value: 240,
    },
    {
      title: "Fri",
      value: 290,
    },
    {
      title: "Sat",
      value: 280,
    },
  ];
  const MonthlyData = [
    {
      title: "Mar",
      value: 1400,
    },
    {
      title: "Apr",
      value: 2700,
    },
    {
      title: "May",
      value: 2600,
    },
    {
      title: "Jun",
      value: 1200,
    },
    {
      title: "Jul",
      value: 2400,
    },
    {
      title: "Aug",
      value: 2900,
    },
    {
      title: "Sep",
      value: 2800,
    },
  ];
  const YearlyData = [
    {
      title: "2017",
      value: 1400,
    },
    {
      title: "2018",
      value: 2700,
    },
    {
      title: "2019",
      value: 2600,
    },
    {
      title: "2020",
      value: 1200,
    },
    {
      title: "2021",
      value: 2400,
    },
    {
      title: "2022",
      value: 2900,
    },
    {
      title: "2023",
      value: 2800,
    },
  ];
  const [data, setData] = useState<GraphStats>()
  useEffect(() => {
    console.log(period);
    
    if(period === 'Weekly')
    setData(graphData?.weekly)
    else if(period === 'Monthly')
    setData(graphData?.monthly)
    else if(period === 'Yearly')
    setData(graphData?.yearly)
  }
  , [period,graphData])
  
  return (
    <div className={classes.chartContainer}>
      <div >
      <h2>Transactions Amount</h2>
      </div>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      
    >
       <CartesianGrid  strokeDasharray="3 3" fill='transparent' /> {/* Set the fill color for the background */}
      <XAxis dataKey="label" />
      <YAxis dataKey="count" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="count"
        stroke={color}
        activeDot={{ r: 8 }}
      />
    </LineChart>
    </div>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    chartContainer:{
      display:'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems:'center',
      width:'50%',
    },
  }))
export default TransactionsAmountGraph;