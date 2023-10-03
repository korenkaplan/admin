import React, { FC, useEffect, useState } from 'react';
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles, createStyles } from '@mui/styles';
import { ITopSellingItem } from '../Dashboard-dto';
interface Props {
    color:string
    graphData:ITopSellingItem[]
    layout:'horizontal'| 'vertical'
    header:string
    XAxisType:'number' | 'category'
    YAxisType:'number' | 'category'
    XAxisDataKey:string
    YAxisDataKey:string
    BarDataKey?:string
}

const CustomBarChart: FC<Props> = ({BarDataKey,XAxisDataKey,YAxisDataKey,XAxisType,YAxisType,color, graphData,header,layout}) => {
    const classes = useStyles();
    const [data, setsData] = useState<ITopSellingItem[]>(graphData)

    useEffect(() => {
        setsData(graphData)
    }, [graphData])

    return (
        <div className={classes.chartContainer}>
            <div >
                <h2>{header}</h2>
            </div>
            <BarChart
                width={600}
                height={300}
                data={data}
                layout={layout}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type={XAxisType} dataKey={XAxisDataKey}  />
                <YAxis type={YAxisType} width={150} padding={{ left: 20 }} dataKey={YAxisDataKey}/>
                <Tooltip />
                <Legend />
                <Bar dataKey={BarDataKey? BarDataKey: XAxisDataKey} fill={color} />
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
export default CustomBarChart;