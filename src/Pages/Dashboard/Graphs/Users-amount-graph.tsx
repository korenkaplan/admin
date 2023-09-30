import React, { FC,  useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
interface Props {
  period:string
  color:string
}

const UsersAmountGraph: FC<Props> = ({period,color}) => {
  const classes = useStyles();
  const WeeklyData = [
    {
      title: "Sun",
      value: 14,
    },
    {
      title: "Mon",
      value: 30,
    },
    {
      title: "Tue",
      value: 50,
    },
    {
      title: "Wed",
      value: 80,
    },
    {
      title: "Thu",
      value: 40,
    },
    {
      title: "Fri",
      value: 30,
    },
    {
      title: "Sat",
      value: 50,
    },
  ];
  const MonthlyData = [
    {
      title: "Mar",
      value: 300,
    },
    {
      title: "Apr",
      value: 400,
    },
    {
      title: "May",
      value: 200,
    },
    {
      title: "Jun",
      value: 150,
    },
    {
      title: "Jul",
      value: 500,
    },
    {
      title: "Aug",
      value: 600,
    },
    {
      title: "Sep",
      value: 400,
    },
  ];
  const YearlyData = [
    {
      title: "2017",
      value: 0,
    },
    {
      title: "2018",
      value: 1000,
    },
    {
      title: "2019",
      value: 1200,
    },
    {
      title: "2020",
      value: 1500,
    },
    {
      title: "2021",
      value: 1000,
    },
    {
      title: "2022",
      value: 950,
    },
    {
      title: "2023",
      value: 2500,
    },
  ];
  const [data, setData] = useState(MonthlyData)
  //TODO: Fetch the data from the server on use effect
  useEffect(() => {
    if(period === 'Weekly')
    setData(WeeklyData)
    else if(period === 'Monthly')
    setData(MonthlyData)
    else if(period === 'Yearly')
    setData(YearlyData)
  }
  , [period])
  
  return (
    <div className={classes.chartContainer}>
      <div >
      <h2>New Users Joinings</h2>
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
      <XAxis dataKey="title" />
      <YAxis dataKey="value" />
      <Tooltip  />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
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
export default UsersAmountGraph;