import ILogin from "./ILogin";
import IProduct from "./IProduct";

export default interface IUser extends ILogin {
    id?:0, 
    name: string,
    email: string,
    password: string,
    picture: string
    product?:  IProduct | null
}