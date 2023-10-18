import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../service/Service";
import { useNavigate } from "react-router-dom";
import IUser from "../interfaces/IUser";

export default function Register() {
    const navigate = useNavigate();

    const [register, setRegister] = useState<IUser>({
        name: '',
        email: '',
        password: '',
        picture: '',
    });
    
    const [registerResponse, setRegisterResponse] = useState<IUser>({
        id: 0,
        name: '',
        email: '',
        password: '',
        picture: '',
    });

    function updateState(e: ChangeEvent<HTMLInputElement>) {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        }
        )
    }

    async function postRegister(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const {name, password} = register;

        if (name.length >= 5 && password.length >= 5) {
            try {
             await registerUser('/user/register', register, setRegisterResponse)
                alert('Usuário Cadastrado com Sucesso');   
            } catch (error) {
                alert("Erro ao cadastrar o Usuário");
            }
        } else {
            alert('Dados inconsistentes. Verifique as informações de cadastro.')
            setRegister({...register, password: ''})
        }
    }

    useEffect(() => {
        if (registerResponse.id !== 0) {
            navigate('/login')
        }
    }, [registerResponse]);

    return (
        <div>
            <form onSubmit={postRegister}>
                <section>
                    <label htmlFor="name">
                        Name
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={register.name}
                            onChange={(e) => updateState(e)}
                        />
                    </label>
                </section>
                <section>
                    <label htmlFor="email">
                        Email
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={register.email}
                            onChange={(e) => updateState(e)}
                        />
                    </label>
                </section>
                <section>
                    <label htmlFor="password">
                        Senha
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={register.password}
                            onChange={(e) => updateState(e)}
                        />
                    </label>
                </section>
                <section>
                    <label htmlFor="picture">
                        Foto
                        <input
                            id="picture"
                            type="text"
                            name="picture"
                            value={register.picture}
                            onChange={(e) => updateState(e)}
                            />
                    </label>
                </section>
                <section>
                <p>Já possui conta? <Link to='/login'>Login</Link></p>

                </section>
                <section>
                    <button onClick={() => navigate('/home')}>Cancelar</button>
                    <button type="submit">Cadastrar</button>
                </section>
                </form>
        </div>
    );
}