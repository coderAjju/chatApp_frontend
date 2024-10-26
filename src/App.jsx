import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/RegistrationPage';
import Chat from './Chat';
import './App.css'
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';
import RoomSelection from './components/RoomSelection';
const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}/>
                        <Route path="/register" element={<Registration />} />
                        <Route
                            path="/roomSelection"
                            element={<RoomSelection/>}
                        />
                        <Route
                            path="/chat"
                            element={<Chat />}
                        />
                </Routes>
            </Router>
            <Toaster />
        </>
    );
};

export default App;
