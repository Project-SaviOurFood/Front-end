import ICategory from "./ICategory";
import IUser from "./IUser";

export default interface IProduct {
    id: number,
    name: string,
    value: number,
    expirationDate: Date,
    picture: string,
    category: ICategory | null,
    user: IUser | null
}