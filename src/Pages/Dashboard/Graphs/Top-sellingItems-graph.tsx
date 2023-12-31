import React, { FC, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles, createStyles } from '@mui/styles';
import { ITopSellingItem } from '../Dashboard-dto';
interface Props {
    color:string
    graphData:ITopSellingItem[]
}

const TopSellingItems: FC<Props> = ({color, graphData}) => {
    const classes = useStyles();
    const [data, setsData] = useState<ITopSellingItem[]>(graphData)

    useEffect(() => {
        setsData(graphData)
    }, [graphData])

    return (
        <div className={classes.chartContainer}>
            <div >
                <h2>Top Selling Items</h2>
            </div>
            <BarChart
                width={600}
                height={300}
                data={data}
                layout="vertical"
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="totalTagsAmount"  />
                <YAxis type="category" width={150} padding={{ left: 20 }} dataKey="name"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="totalTagsAmount" fill={color} />
            </BarChart>
        </div>
    );
};
const useStyles = makeStyles(() =>
    createStyles({
        chartContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
        },
    }))
export default TopSellingItems;