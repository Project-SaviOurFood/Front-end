import { useState, ReactNode, createContext } from 'react';


type UserProviderProps = {
  children: ReactNode;
}

/* type IUserContext = {
  userResponse: string,
  setUserResponse: React.Dispatch<React.SetStateAction<IUserResponse>>
} */

export const NadaContext = createContext({});


export function UserProvider({ children }: UserProviderProps) {
  const [userResponse, setUserResponse] = useState({
    id: 0,
    name: '',
    email: '',
    password: '',
    picture: '',
    token: ''
  });


  return (
    <NadaContext.Provider value={{userResponse, setUserResponse}}>
    {children}
    </NadaContext.Provider>
  );
}

