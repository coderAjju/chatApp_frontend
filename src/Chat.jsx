
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const room = localStorage.getItem('room');
    const username = localStorage.getItem('username') || 'Guest';
    const navigate = useNavigate();

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/api/messages/${room}`);
            const data = await response.json();
            console.log(data);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    useEffect(() => {
        if (room) {
            
            fetchMessages(); // Call the function to fetch messages

            socket.emit('joinRoom', room);

            socket.on('receiveMessage', (data) => {
                setMessages((prevMessages) => [...prevMessages, data]);
            });
        }

        return () => {
            socket.off('receiveMessage');
        };
    }, [room,message]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && room) {
            socket.emit('sendMessage', { room, message, username });
            setMessage('');
        }
        fetchMessages();
    };

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 className="text-xl font-semibold">Room: {room}</h1>
                <span className="text-sm">Logged in as: {username}</span>
            </div>

            {/* Message List */}
            <div className="flex-grow overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`p-3 rounded-lg max-w-xs ${msg.username === username ? 'bg-blue-600' : 'bg-gray-700'} `}>
                            <span className="block font-semibold text-sm mb-1">{msg.username}</span>
                            <p className="text-sm">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="flex items-center p-4 bg-gray-900">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 mr-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
                <button
                    type="submit"
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
