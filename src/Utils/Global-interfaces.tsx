import { Color } from "@mui/material";
import { Category, Fabric, ClothingGender, Season } from "./Global-enums";

export interface IItem {
    _id:string
    name: string;
    category: Category;
    price: number;
    imageSource: string;
    fabric: Fabric;
    gender: ClothingGender;
    season: Season;
    colors: Color[]
    createdAt: Date
}
export interface ItemTableRow {
    id:string
    name: string;
    category: Category;
    price: number;
    fabric: Fabric;
    gender: ClothingGender;
    season: Season;
}
export interface ITransaction {
    _id: string
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
export interface TransactionTableRow {
    userId: string
    id: string
    cardNumber: string
    cardType: string
    totalAmount: number
    formattedDate: string
}