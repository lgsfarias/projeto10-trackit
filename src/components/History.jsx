import styled from 'styled-components';

const History = () => {
    return (
        <HistoryContainer>
            <div className="header">
                <h1>Historico</h1>
            </div>
            <div className="soon">
                <p>
                    Em breve você poderá ver o histórico dos seus hábitos aqui!
                </p>
            </div>
        </HistoryContainer>
    );
};

export default History;

const HistoryContainer = styled.div`
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 70px;
    display: flex;
    flex-direction: column;
    padding: 28px 18px;
    background: #e5e5e5;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;

        h1 {
            font-family: 'Lexend Deca';
            font-size: 25px;
            color: #126ba5;
        }
    }

    .soon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        p {
            font-family: 'Lexend Deca';
            font-size: 18px;
            line-height: 22px;
            color: #666666;
        }
    }
`;
