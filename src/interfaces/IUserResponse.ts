import IUser from "./IUser"

export default interface IUserResponse extends IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    picture: string,
    token: string
}