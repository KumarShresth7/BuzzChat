import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import '../pages/styles/chat.css';
import Shresth from '../assets/me.png';
import Vedant from '../assets/vedant.png';
import Abhinandan from '../assets/abhinandan.png';

const socket = io('http://localhost:3001');

const Chat = () => {

    const [message, setmessage] = useState('');
    const [messages, setmessages] = useState([]);


    useEffect(() => {
        socket.on('chat message', (msg) => {
            setmessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);


    const handleSubmit = (e) =>{
        e.preventDefault();
        if(message){
            socket.emit('chat message',message);
            setmessage('');
        }
    }





  return (
    <div>
      <nav class="navbar">
        <div class="navbar-brand">
            <a href="#">ChatApp</a>
        </div>
        {/* <ul class="navbar-menu">
            <li class="navbar-item"><a href="#">Home</a></li>
            <li class="navbar-item"><a href="#">Messages</a></li>
            <li class="navbar-item"><a href="#">Contacts</a></li>
            <li class="navbar-item"><a href="#">Settings</a></li>
        </ul> */}
        <div class="navbar-actions">
            <button class="navbar-button">Login</button>
            <button class="navbar-button">Sign Up</button>
        </div>
    </nav>
      <div className="container-xxl">
    
        <div className="users">
        <div className="user-list-container">
          <div className="user-header">
          <h2>Users</h2>
          </div>
        
        <ul class="user-list">
            <li class="user-item">
                <img src={Shresth} alt="User 1" class="user-avatar"/>
                <span class="user-name">Shresth</span>
            </li>
            <li class="user-item">
                <img src={Vedant} alt="User 2" class="user-avatar"/>
                <span class="user-name">Vedant</span>
            </li>
            <li class="user-item">
                <img src={Abhinandan} alt="User 3" class="user-avatar"/>
                <span class="user-name">Abhinandan</span>
            </li>
        </ul>

        </div>
        </div>

        <div className="chats">
        <div class="chat-header">
            <h2>Chat</h2>
        </div>
        <div class="chat-messages">
            {/* <div class="message">
                <div class="message-content">Hello, how are you?</div>
            </div>
            <div class="message user">
                <div class="message-content">I'm good, thanks! How about you?</div>
            </div> */}
        <div>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
        </div>
        </div>
        
        <form class="chat-input" onSubmit={handleSubmit}>
            <input type="text" className='message-input' value={message} placeholder="Type a message..." onChange={(e)=>setmessage(e.target.value)} />
            <button type='submit' className='send-button'>Send</button>
        </form>
        </div>

      </div>
    </div>
  )
}

export default Chat