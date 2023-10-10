import { useState, ReactNode, createContext } from 'react';
import IUserResponse from '../interfaces/IUserResponse';
import { loginUser } from '../service/Service';
import ILogin from '../interfaces/ILogin';


type UserProviderProps = {
  children: ReactNode;
}

type IUserContext = {
  userResponse: IUserResponse,
  setUserResponse: React.Dispatch<React.SetStateAction<IUserResponse>>,
  handleLogin(usarioLogin: ILogin): Promise<void>,
  isLoading: boolean
}

export const UserContext = createContext({} as IUserContext);


export function UserProvider({ children }: UserProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [userResponse, setUserResponse] = useState({
    id: 0,
    name: '',
    email: '',
    password: '',
    picture: '',
    token: ''
  });

  async function handleLogin(userLogin: ILogin) {
    setIsLoading(true)
    try {
      await loginUser(`/user/login`, userLogin, setUserResponse)
      alert("Usuário logado com sucesso")
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      alert("Dados do usuário inconsistentes")
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{isLoading, userResponse, setUserResponse, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
}

