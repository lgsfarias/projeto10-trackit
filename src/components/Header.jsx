import styled from 'styled-components';
import SpongeBob from '../assets/img/SpongeBob.png';

const Header = () => {
    return (
        <HeaderContainer>
            <h1>TrackIt</h1>
            <img src={SpongeBob} alt="spongebob" />
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
        border-radius: 50%;
        border: 1px solid #fff;
    }
`;
