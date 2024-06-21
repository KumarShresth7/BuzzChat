import React, { useEffect, useState, useContext } from 'react';
import './styles/chat.css'
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const socket = io('https://buzz-chat-api.vercel.app', {
  withCredentials: true,
  transportOptions: {
    polling: {
      extraHeaders: {
        "Authorization": localStorage.getItem('token'), // Assuming you use a token for auth
        "my-custom-header": "abcd" // Custom header if needed
      }
    }
  }
});

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socketID, setSocketID] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        };

        const res = await axios.get('https://buzz-chat-api.vercel.app/api/auth/me', config);
        setUser(res.data);

        const usersResponse = await axios.get('https://buzz-chat-api.vercel.app/api/auth/users', config);
        setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);

        const messageResponse = await axios.get('https://buzz-chat-api.vercel.app/api/messages', config);
        setMessages(Array.isArray(messageResponse.data) ? messageResponse.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    socket.on('connect', () => {
      setSocketID(socket.id);
      console.log('Connected', socket.id);
    });

    socket.on('chat message', (msg) => {
      if (msg.id !== socketID) {
        setMessages((prevMessages) => [...prevMessages, { text: msg.text, sender: 'other' }]);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('chat message');
    };

  }, [navigate, setUser, socketID, messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      };

      const senderId = user._id;
      if (!selectedUser || !selectedUser._id) {
        console.error('No valid user selected');
        return;
      }

      const res = await axios.post('https://buzz-chat-api.vercel.app/api/messages', {
        text: message,
        receiverId: selectedUser._id,
        senderId
      }, config);
      
      setMessages([...messages, { text: message, sender: 'self' }, res.data]);
      setMessage('');

    } catch (error) {
      console.log('Error submitting message', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">BuzzChat</a>
        </div>
        <div className="navbar-actions">
          Hi, {user?.username}
        </div>
      </nav>
      <div className="container-xxl">
        <div className="users">
          <div className="user-list-container">
            <div className="user-header">
              <h2>Users</h2>
            </div>
            <ul className="user-list">
              {Array.isArray(users) && users.map((u) => (
                <li key={u._id} className="user-item" onClick={() => setSelectedUser(u)}>
                  <img src={u.avatar} alt={u.username} className="user-avatar" />
                  <span className="user-name">{u.username}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="chats">
          <div className="chat-header">
            <h2>Chat with {selectedUser ? selectedUser.username : '...'}</h2>
          </div>
          <div className="chat-messages">
            {Array.isArray(messages) && messages.filter((msg) => (
              msg.sender?._id === selectedUser?._id || msg.receiver?._id === selectedUser?._id
            )).map((msg, index) => (
              msg.sender?._id === user._id ?
                (<div className='message' key={index}><div className='message-content'>{msg.text}</div></div>)
                :
                (<div className='message user' key={index}><div className='message-content'>{msg.text}</div></div>)
            ))}
          </div>
          <form className="chat-input" onSubmit={handleSubmit}>
            <input type="text" className="message-input" value={message} placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
