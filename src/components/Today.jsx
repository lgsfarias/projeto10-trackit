import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import * as dayjs from 'dayjs';
import axios from 'axios';

import TokenContext from '../contexts/TokenContext';

const Today = () => {
    const [todayHabits, setTodayHabits] = useState([]);

    const { token } = useContext(TokenContext);

    useEffect(() => {
        const URL =
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get(URL, config)
            .then((response) => {
                setTodayHabits(response.data);
            })
            .catch(alert);
        // eslint-disable-next-line
    }, []);

    return (
        <TodayContainer>
            <div className="header">
                <h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
            </div>
            <div className="today">
                <p>Você não tem nenhum hábito hoje!</p>
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

    .today {
        display: flex;
        /* flex-direction: column; */
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
