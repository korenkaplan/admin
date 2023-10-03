import React, { FC,  useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
interface Props {
  period:string
  color:string
  graphData:GraphStats | ZeroData
}

const UsersAmountGraph: FC<Props> = ({period,color,graphData}) => {
  const classes = useStyles();
  const [data, setData] = useState<GraphStats>()
  //TODO: Fetch the data from the server on use effect
  useEffect(() => {
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
      <XAxis dataKey="label" />
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