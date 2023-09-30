export interface DashboardTopRowDto {
    revenue: number;
    revenueDifferencePercentage: number;
    avgSale: number;
    avgSaleDifferencePercentage:number;
    transactionsAmount: number;
    transactionsAmountDifferencePercentage: number;
}
export interface TopSellingItemsDto {
    weekly: IStats[]
    monthly: IStats[]
    yearly: IStats[]
}
export interface IStats {
    year?: number,
    label: string,
    value: number 
    date?: Date
}