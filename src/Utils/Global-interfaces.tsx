export interface ITransaction {
    _id?: string
    userId: string
    cardNumber: string
    cardType: string
    totalAmount: number
    products: ITransactionItem[]
    schemaVersion: number
    formattedDate: string
    createdAt: Date
    couponDiscountAmount?: number

}
export interface ITransactionItem {
    itemId: string
    nfcTagCode: string
    imageSource: string
    name: string
    price: number
 }