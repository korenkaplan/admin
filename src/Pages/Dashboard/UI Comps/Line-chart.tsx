import React, { FC,  useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { GraphStats, ZeroData } from '../Dashboard-dto';
interface Props {
  period:string
  color:string
  graphData:GraphStats | ZeroData,
  header:string
  XAxisDataKey:string
  YAxisDataKey:string
  fillColor?:string
}

const CustomLineChart: FC<Props> = ({period,color,graphData,header,XAxisDataKey,YAxisDataKey,fillColor}) => {
  const classes = useStyles();

  const [data, setData] = useState<GraphStats>()
  //TODO: Fetch the data from the server on use effect
  useEffect(() => {
    if(period === 'Weekly')
    setData(graphData.weekly)
    else if(period === 'Monthly')
    setData(graphData.monthly)
    else if(period === 'Yearly')
    setData(graphData.yearly)
  }
  , [period,graphData] )
  console.log(graphData);
  
  return (
    <div className={classes.chartContainer}>
      <div >
      <h2>{header}</h2>
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
       <CartesianGrid  strokeDasharray="3 3" fill={fillColor? fillColor :'transparent'} /> 
      <XAxis dataKey={XAxisDataKey} />
      <YAxis dataKey={YAxisDataKey} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={YAxisDataKey}
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
export default CustomLineChart;