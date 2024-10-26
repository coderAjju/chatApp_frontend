// src/RoomSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomSelection = () => {
    const [room, setRoom] = useState('');
    const navigate = useNavigate();

    const joinRoom = (e) => {
        e.preventDefault();
        if (room.trim()) {
            localStorage.setItem('room', room);
            navigate('/chat');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
            <h2 className="text-2xl mb-4">Enter Room Name to Start Chatting</h2>
            <form onSubmit={joinRoom} className="flex space-x-2">
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Room Name"
                    className="p-2 rounded-lg text-black"
                />
                <button type="submit" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                    Join Room
                </button>
            </form>
        </div>
    );
};

export default RoomSelection;
