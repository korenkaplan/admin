export interface DashboardTopRowDto {
    revenue: number;
    revenueDifferencePercentage: number;
    avgSale: number;
    avgSaleDifferencePercentage:number;
    transactionsAmount: number;
    transactionsAmountDifferencePercentage: number;
}
export interface TopRowCardGraphData{
    value: number;
}
export interface TopSellingItemsDto {
    weekly: IStats[]
    monthly: IStats[]
    yearly: IStats[]
}
export interface IStats {
    year?: number
    label: string
    value: number 
    date?: Date
}
export interface GraphStats {
    weekly: IStats[]
    monthly: IStats[]
    yearly: IStats[]
}
export interface TransactionGraphStats {
    weekly: IStatsDouble[]
    monthly: IStatsDouble[]
    yearly: IStatsDouble[]
}
export interface IStatsDouble {
    year?: number,
    label: string,
    value: number,
    count:number, 
    date?: Date
}
export interface ITopSellingItem {
    _id:string,
    name:string,
    totalTagsAmount:number,
}
export interface ZeroData {
    monthly:{count:number, value:number}[]
    yearly:{count:number, value:number}[]
    weekly:{count:number, value:number}[]
}