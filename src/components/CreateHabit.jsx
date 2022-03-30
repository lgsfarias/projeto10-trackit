import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import TokenContext from '../contexts/TokenContext';

const CreateHabit = ({ formHabitVisible, setFormHabitVisible, listHabits }) => {
    const [habit, setHabit] = useState({ name: '', days: [] });
    const [loading, setLoading] = useState(false);
    const { token } = useContext(TokenContext);

    const daysBuilder = () => {
        const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        return weekDays.map((day, index) => {
            const css = habit.days.includes(index + 1)
                ? 'habit-day habit-day--active'
                : 'habit-day habit-day--inactive';
            return (
                <div
                    key={index + 1}
                    className={css}
                    onClick={() => toggle(index + 1)}
                >
                    <p>{day}</p>
                </div>
            );
        });
    };

    const toggle = (day) => {
        if (habit.days.includes(day)) {
            setHabit({ ...habit, days: habit.days.filter((d) => d !== day) });
        } else {
            setHabit({ ...habit, days: [...habit.days, day] });
        }
    };

    const createHabit = () => {
        const URL =
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

        const body = { ...habit };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post(URL, body, config)
            .then((res) => {
                listHabits();
                setFormHabitVisible(false);
                setLoading(false);
            })
            .catch((err) => {
                alert(err);
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createHabit();
        setHabit({ name: '', days: [] });
    };

    return (
        <CreateHabitForm
            formHabitVisible={formHabitVisible}
            onSubmit={handleSubmit}
        >
            <input
                onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                value={habit.name}
                type="text"
                placeholder="Nome do hábito"
                disabled={loading ? true : false}
            />
            <div className="days">{daysBuilder()}</div>
            <div className="createHabit__form__footer">
                <p
                    onClick={() => {
                        setFormHabitVisible(false);
                    }}
                >
                    Cancelar
                </p>
                <button type="submit">
                    {loading ? (
                        <ThreeDots color="#fff" height={11} />
                    ) : (
                        'Salvar'
                    )}
                </button>
            </div>
        </CreateHabitForm>
    );
};

export default CreateHabit;

const CreateHabitForm = styled.form`
    position: relative;
    width: 100%;
    height: ${(props) => (props.formHabitVisible ? '180px' : '0px')};
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: ${(props) => (props.formHabitVisible ? '15px' : '0px')};
    margin-bottom: 30px;
    overflow: hidden;
    opacity: ${(props) => (props.formHabitVisible ? '1' : '0')};
    transition: 1s;

    input {
        width: 100%;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #d5d5d5;
        padding: 11px;

        font-family: 'Lexend Deca';
        font-size: 20px;

        outline: none;
    }

    input::placeholder {
        color: #dbdbdb;
    }

    .days {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .habit-day {
            font-family: 'Lexend Deca';
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 5px;
            margin-right: 4px;
            cursor: pointer;

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

    .createHabit__form__footer {
        position: absolute;
        right: 16px;
        bottom: 16px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        opacity: ${(props) => (props.formHabitVisible ? '1' : '0')};
        transition: 1s;

        p {
            font-family: 'Lexend Deca';
            font-size: 16px;
            color: #52b6ff;
            margin-right: 23px;
            cursor: pointer;
        }

        button[type='submit'] {
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
`;
