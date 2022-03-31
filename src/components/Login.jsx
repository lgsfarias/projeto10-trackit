import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import UserContext from '../contexts/UserContext';
import TokenContext from '../contexts/TokenContext';
import Logo from '../assets/img/logoTrackIt.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(
                'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',
                {
                    email,
                    password,
                }
            )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                setToken(response.data.token);
                navigate('/hoje');
            })
            .catch((error) => {
                alert('Usuário ou senha inválidos');
                setLoading(false);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
            setToken(JSON.parse(localStorage.getItem('user')).token);
            navigate('/hoje');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LoginContainer>
            <div className="logo-container">
                <img src={Logo} alt="logo" />
                <h1>TrackIt</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email"
                    required
                    value={email}
                    disabled={loading ? true : false}
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="senha"
                    required
                    value={password}
                    disabled={loading ? true : false}
                />
                <button type="submit">
                    {loading ? (
                        <ThreeDots color="#fff" height={13} />
                    ) : (
                        'Entrar'
                    )}
                </button>
                {/* <input type="submit" value="Entrar" /> */}
            </form>
            <h1 className="link" onClick={() => navigate('/cadastro')}>
                Não tem um conta? Cadastre-se!
            </h1>
        </LoginContainer>
    );
};

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    width: 100vw;

    .logo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 70px;
        margin-bottom: 35px;

        img {
            width: 180px;
        }

        h1 {
            font-family: 'Playball';
            font-size: 70px;
            color: #126ba5;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        input {
            width: 300px;
            height: 45px;
            border-radius: 5px;
            border: 1px solid #d5d5d5;
            padding: 11px;
            margin-bottom: 6px;

            font-family: 'Lexend Deca';
            font-size: 20px;

            outline: none;
        }

        input::placeholder {
            color: #dbdbdb;
        }

        button[type='submit'] {
            width: 300px;
            height: 45px;
            border-radius: 5px;
            border: 1px solid #d5d5d5;
            padding: 11px;
            margin-bottom: 6px;

            font-family: 'Lexend Deca';
            font-size: 20px;

            outline: none;
            background: #52b6ff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .link {
        font-family: 'Lexend Deca';
        font-size: 15px;
        color: #52b6ff;
        margin-top: 25px;
        text-decoration: underline;
        cursor: pointer;
    }
`;
