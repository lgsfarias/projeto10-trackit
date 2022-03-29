import React, { useState } from 'react';
import styled from 'styled-components';

import { BsTrash } from 'react-icons/bs';

const Habits = () => {
    // const [habits, setHabits] = useState(new Map());
    const [habits, setHabits] = useState([1, 2, 3]);
    // const [habits, setHabits] = useState();

    return (
        <HabitsContainer>
            <div className="header">
                <h1>Meus hábitos</h1>
                <button>+</button>
            </div>
            <div className="habits">
                {habits ? (
                    habits.map((key) => (
                        <div className="habit" key={key}>
                            <p className="title">Ler 1 capítulo de livro</p>
                            <BsTrash className="trash" />
                        </div>
                    ))
                ) : (
                    <p>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um
                        hábito para começar a trackear!
                    </p>
                )}
            </div>
        </HabitsContainer>
    );
};

export default Habits;

const HabitsContainer = styled.div`
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

        button {
            width: 40px;
            height: 35px;
            border-radius: 5px;
            background: #52b6ff;
            border: 1px solid #52b6ff;
            color: #ffffff;
            font-size: 26.976px;
            text-align: center;
        }
    }

    .habits {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .habit {
            position: relative;
            width: 100%;
            height: 90px;
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 10px;
            padding: 15px;

            p {
                font-family: 'Lexend Deca';
                font-size: 20px;
                color: #666666;
            }

            .trash {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 15px;
            }
        }

        p {
            font-family: 'Lexend Deca';
            font-size: 18px;
            line-height: 22px;
            color: #666666;
        }
    }
`;
