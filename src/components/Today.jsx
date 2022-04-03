import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../contexts/UserContext';
import TodayHabit from './TodayHabit';

const Today = () => {
    const today = new Date();
    const [todayHabits, setTodayHabits] = useState();
    const [loading, setLoading] = useState(false);
    const { user, completedStatus, setCompletedStatus } =
        useContext(UserContext);

    const dateOptions = {
        weekday: 'long',
        month: 'numeric',
        day: 'numeric',
    };

    const todayHabitsBuilder = () => {
        return todayHabits.map((habit) => {
            return (
                <TodayHabit
                    key={habit.id}
                    habit={habit}
                    loading={loading}
                    handleClick={() => {
                        setLoading(true);
                        toggle(habit.id);
                    }}
                />
            );
        });
    };

    const toggle = (id) => {
        todayHabits.find((habit) => habit.id === id).done
            ? uncheckHabit(id)
            : checkHabit(id);
    };

    const checkHabit = (id) => {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios
            .post(URL, null, config)
            .then((response) => {
                listTodayHabits();
            })
            .catch((err) => alert(err.response.data.message));
    };

    const uncheckHabit = (id) => {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios
            .post(URL, null, config)
            .then((response) => {
                listTodayHabits();
            })
            .catch((err) => alert(err.response.data.message));
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
                setLoading(false);
                setTodayHabits(response.data);
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

    useEffect(() => {
        listTodayHabits();
        // eslint-disable-next-line
    }, []);

    return (
        <TodayContainer todayHabits={todayHabits}>
            <div className="header">
                <h1>
                    {today
                        .toLocaleDateString('pt-br', dateOptions)
                        .split('-')
                        .map(
                            (str) => str.charAt(0).toUpperCase() + str.slice(1)
                        )
                        .join('-')}
                </h1>
                {todayHabits && !isNaN(completedStatus) ? (
                    completedStatus > 0 ? (
                        <p className="habits-done">
                            {completedStatus.toFixed()}% dos hábitos concluídos
                        </p>
                    ) : (
                        <p className="habits-done habits-done--no-habits">
                            Nenhum hábito concluído ainda
                        </p>
                    )
                ) : (
                    <></>
                )}
            </div>
            <div className="today">
                {todayHabits && !isNaN(completedStatus) ? (
                    todayHabitsBuilder()
                ) : (
                    <p>Você não tem habitos para hoje</p>
                )}
            </div>
        </TodayContainer>
    );
};

export default Today;

const TodayContainer = styled.div`
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
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 28px;

        h1 {
            font-family: 'Lexend Deca';
            font-size: 25px;
            line-height: 30px;
            color: #126ba5;
        }

        .habits-done {
            font-family: 'Lexend Deca';
            font-size: 18px;
            line-height: 20pz;
            color: #8fc549;

            &--no-habits {
                color: #bababa;
            }
        }
    }

    .today {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        p {
            font-family: 'Lexend Deca';
            font-size: 18px;
            line-height: 22px;
            color: #666666;
        }
    }
`;
