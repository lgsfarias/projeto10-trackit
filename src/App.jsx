import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <TokenContext.Provider value={{ token, setToken }}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<SignUp />} />
                        <Route path="/habitos" element={<Habits />} />
                        <Route path="/hoje" element={<Today />} />
                        <Route path="/historico" element={<History />} />
                    </Routes>
                    <Menu />
                </Router>
            </TokenContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
