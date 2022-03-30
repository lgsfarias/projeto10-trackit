import styled from 'styled-components';
import SpongeBob from '../assets/img/SpongeBob.png';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <HeaderContainer>
            <h1>TrackIt</h1>
            <img src={user.image ? user.image : SpongeBob} alt="spongebob" />
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 18px;

    background: #126ba5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1 {
        font-family: 'Playball';
        font-size: 40px;
        color: #fff;
    }

    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        border: 1px solid #fff;
    }
`;
