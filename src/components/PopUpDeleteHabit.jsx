import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import UserContext from '../contexts/UserContext';

const PopUpDeleteHabit = ({
    popUpVisible,
    setPopUpVisible,
    id,
    listHabits,
    listTodayHabits,
}) => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    const deleteHabit = (id) => {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios
            .delete(URL, config)
            .then((response) => {
                listHabits();
                listTodayHabits();
                setPopUpVisible(false);
                setLoading(false);
            })
            .catch(alert);
    };

    return (
        <PopUpContainer popUpVisible={popUpVisible}>
            <div className="popUp">
                <h1>Deseja realmente excluir esse hábito?</h1>

                <div className="popUp__footer">
                    <p
                        onClick={() => {
                            setPopUpVisible(false);
                        }}
                    >
                        Cancelar
                    </p>
                    <button
                        onClick={() => {
                            setLoading(true);
                            deleteHabit(id);
                        }}
                    >
                        {loading ? (
                            <ThreeDots color="#fff" height={11} />
                        ) : (
                            'Excluir'
                        )}
                    </button>
                </div>
            </div>
        </PopUpContainer>
    );
};

export default PopUpDeleteHabit;

const PopUpContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.popUpVisible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    z-index: 10;

    .popUp {
        position: relative;
        width: 340px;
        height: 150px;
        background-color: #fff;
        border-radius: 5px;
        padding: 15px;

        h1 {
            font-family: 'Lexend Deca';
            font-size: 20px;
        }

        &__footer {
            position: absolute;
            right: 15px;
            bottom: 15px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            p {
                font-family: 'Lexend Deca';
                font-size: 16px;
                color: #52b6ff;
                margin-right: 23px;
                cursor: pointer;
            }

            button {
                width: 84px;
                height: 35px;
                border-radius: 5px;
                border: 1px solid #d5d5d5;
                padding: 8px;

                font-family: 'Lexend Deca';
                font-size: 16px;

                outline: none;
                background: #52b6ff;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
`;
