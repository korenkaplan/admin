import { Category, ClothingGender, Fabric, Season } from "@/Utils/Global-enums";
import { Color } from "@mui/material";

export interface CreateProductDto {
name: string;
category: Category
price:number;
imageSource:string;
fabric:Fabric;
gender:ClothingGender
season:Season;
colors:Color[];
}
export interface CreateProductForm {
    name: string;
    category: Category
    price:number;
    fabric:Fabric;
    gender:ClothingGender
    season:Season;
    colors:Color[];
    }