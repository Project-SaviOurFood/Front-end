import axios from "axios";
import IRegister from "../interfaces/IRegister";

const api = axios.create({
baseURL: 'https://saviourfood.onrender.com/'
});

export const registerUser = async(url: string, dados: IRegister, setDados: Function) => {
const response = await api.post(url, dados);
setDados(response.data);
}

export const loginUser = async(url: string, dados: IRegister, setDados: Function) => {
const response = await api.post(url, dados);
setDados(response.data);
}