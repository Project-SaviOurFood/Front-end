import axios from "axios";
import IRegister from "../interfaces/IUser";
import ILogin from "../interfaces/ILogin";

const api = axios.create({
baseURL: 'https://saviourfood.onrender.com/'
});

export const registerUser = async(url: string, dados: IRegister, setDados: Function) => {
const response = await api.post(url, dados);
setDados(response.data);
}

export const loginUser = async(url: string, dados: ILogin, setDados: Function) => {
const response = await api.post(url, dados);
setDados(response.data);
}

export const get = async(url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
  }

  export const post = async(url: string, dados: Object, setDados: Function, header: Object) => {
      const response = await api.post(url, dados, header);
      setDados(response.data);
  }
  
  export const put = async(url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
  }

  export const register = async(url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
  }

  export const deletar = async(url: string, header: Object) => {
    await api.delete(url, header)
  }
  



