import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UserContext from '../contexts/UserContext';
import { TodayHabitContainer } from './TodayHabit';
import { BsCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs';

const History = () => {
    const today = new Date();
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    const [date, setDate] = useState(new Date());
    const [habitsHistory, setHabitsHistory] = useState([]);
    const { user } = useContext(UserContext);
    const [dateHabits, setDateHabits] = useState();

    const getHabisHistory = () => {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios
            .get(URL, config)
            .then((response) => {
                setHabitsHistory(response.data);
                setDateHabits(
                    response.data.find(
                        (habit) =>
                            habit.day ===
                            date.toLocaleDateString('pt-br', dateOptions)
                    )
                );
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    useEffect(() => {
        getHabisHistory();
        // console.log('effect render');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDateHabits(
            habitsHistory.find(
                (habit) =>
                    habit.day === date.toLocaleDateString('pt-br', dateOptions)
            )
        );
        // console.log('effect date');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    // console.log('render', dateHabits);

    return (
        <HistoryContainer>
            <div className="header">
                <h1>Historico</h1>
            </div>
            <Calendar
                className="react-calendar"
                value={date}
                onChange={setDate}
                calendarType={'US'}
                maxDate={today}
                tileClassName={({ date }) => {
                    const history = habitsHistory.map((day) => {
                        return {
                            day: day.day,
                            allDone:
                                day.habits.filter((habit) => habit.done)
                                    .length === day.habits.length,
                        };
                    });

                    const allDones = history
                        .filter((day) => day.allDone)
                        .map((day) => day.day);
                    const notAllDone = history
                        .filter((day) => !day.allDone)
                        .map((day) => day.day);
                    // console.log(date, today);

                    if (
                        date.toLocaleDateString('pt-br', dateOptions) !==
                        today.toLocaleDateString('pt-br', dateOptions)
                    ) {
                        if (
                            allDones.includes(
                                date.toLocaleDateString('pt-br', dateOptions)
                            )
                        ) {
                            return 'react-calendar-tile--all-done';
                        } else if (
                            notAllDone.includes(
                                date.toLocaleDateString('pt-br', dateOptions)
                            )
                        ) {
                            return 'react-calendar-tile--not-all-done';
                        } else {
                            return 'react-calendar-tile';
                        }
                    }
                }}
                // tileContent={({ date, view }) =>
                //     view === 'month' && date.getDay() === 0 ? (
                //         <p>It's Sunday!</p>
                //     ) : null
                // }
                // formatDay={}
                // formatDay ={}
            />
            {/* <button onClick={() => console.log(habitsHistory)}>
                console.log histórico de hábitos
            </button> */}
            <div className="date-habits">
                {dateHabits ? (
                    <>
                        <h1>Habitos do dia selecionado:</h1>
                        {dateHabits.habits.map((habit) => (
                            <TodayHabitContainer
                                className="date-habit"
                                key={habit.id}
                            >
                                <h1>{habit.name}</h1>
                                {habit.done ? (
                                    <BsCheckSquareFill
                                        className="check"
                                        fill={'#8FC549'}
                                    />
                                ) : (
                                    <BsFillXSquareFill
                                        className="check"
                                        fill={'#eb3d3a'}
                                    />
                                )}
                            </TodayHabitContainer>
                        ))}
                    </>
                ) : (
                    <h1>Não existem habitos para o dia selecionado</h1>
                )}
            </div>
            {/* <div className="date-habits">{JSON.stringify(dateHabits)}</div> */}
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
    overflow-y: auto;

    .react-calendar {
        /* margin: 0 auto; */
        width: 100%;
    }

    .react-calendar-tile {
        &--all-done {
            background: #8fc549;
            color: #000;
            /* border-radius: 50%; */
        }
        &--not-all-done {
            background: #eb3d3a;
            color: #fff;
            /* border-radius: 50%; */
        }
    }

    .date-habits {
        margin-top: 50px;

        h1 {
            font-family: 'Lexend Deca';
            font-size: 20px;
            line-height: 25px;
            color: #666666;
            margin-bottom: 7px;
        }
    }

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

    /* .react-calendar {
        width: 100%;
        min-height: 272px;
        overflow: hidden;
        border-radius: 10px;
    } */
    /* 
    .react-calendar {
        width: 350px;
        max-width: 100%;
        background: white;
        border: 1px solid rgb(160, 160, 150);
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;

        &--doubleView {
            width: 700px;

            .react-calendar__viewContainer {
                display: flex;
                margin: -0.5em;

                > * {
                    width: 50%;
                    margin: 0.5em;
                }
            }
        }

        &,
        & *,
        & *:before,
        & *:after {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        button {
            margin: 0;
            border: 0;
            outline: none;

            &:enabled {
                &:hover {
                    cursor: pointer;
                }
            }
        }

        &__navigation {
            display: flex;
            height: 44px;
            margin-bottom: 1em;

            button {
                min-width: 44px;
                background: none;

                &:disabled {
                    background-color: rgb(240, 240, 240);
                }

                &:enabled {
                    &:hover,
                    &:focus {
                        background-color: rgb(230, 230, 230);
                    }
                }
            }
        }

        &__month-view {
            &__weekdays {
                text-align: center;
                text-transform: uppercase;
                font-weight: bold;
                font-size: 0.75em;

                &__weekday {
                    padding: 0.5em;
                }
            }

            &__weekNumbers {
                .react-calendar__tile {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75em;
                    font-weight: bold;
                }
            }

            &__days {
                &__day {
                    &--weekend {
                        color: rgb(209, 0, 0);
                    }

                    &--neighboringMonth {
                        color: rgb(117, 117, 117);
                    }
                }
            }
        }

        &__year-view,
        &__decade-view,
        &__century-view {
            .react-calendar__tile {
                padding: 2em 0.5em;
            }
        }

        &__tile {
            max-width: 100%;
            padding: 10px 6.6667px;
            background: none;
            text-align: center;
            line-height: 16px;

            &:disabled {
                background-color: rgb(240, 240, 240);
            }

            &:enabled {
                &:hover,
                &:focus {
                    background-color: rgb(230, 230, 230);
                }
            }

            &--now {
                background: lighten(rgb(220, 220, 0), 30%);

                &:enabled {
                    &:hover,
                    &:focus {
                        background: lighten(
                            lighten(rgb(220, 220, 0), 30%),
                            10%
                        );
                    }
                }
            }

            &--hasActive {
                background: lighten(rgb(0, 110, 220), 30%);

                &:enabled {
                    &:hover,
                    &:focus {
                        background: lighten(
                            lighten(rgb(0, 110, 220), 30%),
                            10%
                        );
                    }
                }
            }

            &--active {
                background: rgb(0, 110, 220);
                color: white;

                &:enabled {
                    &:hover,
                    &:focus {
                        background: lighten(rgb(0, 110, 220), 10%);
                    }
                }
            }
        }

        &--selectRange {
            .react-calendar__tile {
                &--hover {
                    background-color: rgb(230, 230, 230);
                }
            }
        }
    } */
`;
