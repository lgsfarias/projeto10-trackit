import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { BsTrash } from 'react-icons/bs';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import CreateHabit from './CreateHabit';

const Habits = () => {
    const [habits, setHabits] = useState();
    const [formHabitVisible, setFormHabitVisible] = useState(false);
    const { user, setCompletedStatus } = useContext(UserContext);

    const daysBuilder = ({ days }) => {
        const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        return weekDays.map((day, index) => {
            const css = days.includes(index)
                ? 'habit-day habit-day--active'
                : 'habit-day habit-day--inactive';
            return (
                <div key={index} className={css}>
                    <p>{day}</p>
                </div>
            );
        });
    };

    const listTodayHabits = () => {
        const URL =
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        axios
            .get(URL, config)
            .then((response) => {
                setCompletedStatus(
                    (response.data.filter((habit) => habit.done).length /
                        response.data.length) *
                        100
                );
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    const listHabits = () => {
        const URL =
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios
            .get(URL, config)
            .then((response) => {
                setHabits(response.data);
            })
            .catch(alert);
    };

    const deleteHabit = (id) => {
        if (window.confirm('Deseja realmente excluir esse hábito?')) {
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
                })
                .catch(alert);
        }
    };

    useEffect(() => {
        listHabits();
        listTodayHabits();
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, []);

    return (
        <HabitsContainer>
            <div className="header">
                <h1>Meus hábitos</h1>
                <button onClick={() => setFormHabitVisible(!formHabitVisible)}>
                    +
                </button>
            </div>
            <CreateHabit
                formHabitVisible={formHabitVisible}
                setFormHabitVisible={setFormHabitVisible}
                listHabits={() => listHabits()}
            />
            <div className="habits">
                {habits ? (
                    habits.map(({ id, name, days }) => (
                        <div className="habit" key={id}>
                            <p className="title">{name}</p>
                            <div className="days">{daysBuilder({ days })}</div>
                            <BsTrash
                                className="trash"
                                onClick={() => deleteHabit(id)}
                            />
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
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 7px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

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
            cursor: pointer;
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

            .days {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                .habit-day {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 5px;
                    margin-right: 4px;

                    &--active {
                        background: #cfcfcf;
                        border: 1px solid #cfcfcf;

                        p {
                            color: #ffffff;
                        }
                    }

                    &--inactive {
                        background: #ffffff;
                        border: 1px solid #d5d5d5;

                        p {
                            color: #dbdbdb;
                        }
                    }
                }
            }

            .trash {
                position: absolute;
                top: 15px;
                right: 10px;
                font-size: 20px;
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
