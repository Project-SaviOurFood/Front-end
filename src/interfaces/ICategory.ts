import IProduct from "./IProduct";

export default interface ICategory {
    id?: number,
    type: string,
    description: string,
    product?: IProduct | null
}