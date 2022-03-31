import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import TokenContext from './contexts/TokenContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Habits from './components/Habits';
import Today from './components/Today';
import History from './components/History';
import Header from './components/Header';
import Menu from './components/Menu';

const App = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [completedStatus, setCompletedStatus] = useState(0);
    const location = useLocation();

    return (
        <UserContext.Provider
            value={{ user, setUser, completedStatus, setCompletedStatus }}
        >
            <TokenContext.Provider value={{ token, setToken }}>
                {!(
                    location.pathname === '/' ||
                    location.pathname === '/cadastro'
                ) ? (
                    <>
                        <Header />
                        <Menu />
                    </>
                ) : (
                    <></>
                )}
                {/* <Header /> */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<History />} />
                </Routes>
            </TokenContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
