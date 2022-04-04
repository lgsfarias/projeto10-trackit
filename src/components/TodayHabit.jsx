import styled from 'styled-components';
import { BsCheckSquareFill } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';

const TodayHabit = (props) => {
    const { habit, handleClick, loading } = props;
    const { name, currentSequence, highestSequence, done } = habit;

    return (
        <TodayHabitContainer
            done={done}
            currentSequence={currentSequence}
            highestSequence={highestSequence}
        >
            <h1>{name}</h1>
            <p>
                Sequencia atual:{' '}
                <span className="sequence">{currentSequence} dias</span>
            </p>
            <p>
                Seu recorde:{' '}
                <span className="highest-sequence">{highestSequence} dias</span>
            </p>
            {loading ? (
                <div className="loading">
                    <ThreeDots color="#fff" height={11} />
                </div>
            ) : (
                <BsCheckSquareFill
                    className="check"
                    fill={done ? '#8FC549' : '#E7E7E7'}
                    onClick={handleClick}
                />
            )}
        </TodayHabitContainer>
    );
};

export default TodayHabit;

const TodayHabitContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 94px;
    background: #ffffff;
    border-radius: 5px;
    padding: 13px 94px 13px 13px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);

    h1 {
        font-family: 'Lexend Deca';
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 7px;
    }

    p {
        font-family: 'Lexend Deca';
        font-size: 13px;
        line-height: 16px;
        color: #666666;

        .sequence {
            color: ${(props) => (props.done ? '#8FC549' : '#666666')};
        }

        .highest-sequence {
            color: ${(props) =>
                props.highestSequence !== 0 &&
                props.currentSequence === props.highestSequence
                    ? '#8FC549'
                    : '#666666'};
        }
    }

    .check {
        font-size: 69px;
        position: absolute;
        right: 13px;
        cursor: pointer;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 69px;
        height: 69px;
        position: absolute;
        right: 13px;
        background-color: ${(props) => (props.done ? '#8FC549' : '#E7E7E7')};
        border-radius: 10px;
    }
`;

export { TodayHabitContainer };
