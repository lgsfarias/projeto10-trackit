import styled from 'styled-components';
import SpongeBob from '../assets/img/SpongeBob.png';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { GoThreeBars } from 'react-icons/go';

const Header = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <HeaderContainer menuVisible={menuVisible}>
            <div className="menu">
                <GoThreeBars
                    fill="#ffffff"
                    className="menu-icon"
                    onClick={() => {
                        setMenuVisible(!menuVisible);
                    }}
                />
                {menuVisible && (
                    <p
                        onClick={() => {
                            localStorage.removeItem('user');
                            navigate('/');
                        }}
                    >
                        Sair
                    </p>
                )}
            </div>
            <h1>TrackIt</h1>
            <img src={user.image ? user.image : SpongeBob} alt="spongebob" />
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 18px;

    background: #126ba5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    .menu {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: ${({ menuVisible }) => (menuVisible ? '20px' : '0')};
        padding: ${({ menuVisible }) => (menuVisible ? '10px' : '0')};
        box-shadow: ${({ menuVisible }) =>
            menuVisible ? 'inset -2px 1px 6px 1px rgba(0, 0, 0, 0.1)' : 'none'};
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;

        p {
            font-family: 'Lexend Deca';
            color: #ffffff;
            font-size: 20px;
            margin-left: 20px;
            cursor: pointer;
        }

        .menu-icon {
            font-size: 30px;
            margin-right: 10px;
            cursor: pointer;
        }
    }

    h1 {
        font-family: 'Playball';
        font-size: 40px;
        color: #fff;
    }

    img {
        position: absolute;
        right: 18px;
        width: 50px;
        height: 50px;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        border: 1px solid #fff;
    }
`;
