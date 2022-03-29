import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/img/logoTrackIt.png';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, name, photo);
    };

    return (
        <SignUpContainer>
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
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="senha"
                    required
                    value={password}
                />
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="nome"
                    required
                    value={name}
                />
                <input
                    onChange={(e) => setPhoto(e.target.value)}
                    type="text"
                    placeholder="foto"
                    required
                    value={photo}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <h1 className="link" onClick={() => navigate('/')}>
                Já tem uma conta? Faça login!
            </h1>
        </SignUpContainer>
    );
};

export default SignUp;

const SignUpContainer = styled.div`
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

        input[type='submit'] {
            background: #52b6ff;
            color: #fff;
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
