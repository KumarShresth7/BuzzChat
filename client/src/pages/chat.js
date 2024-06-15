import React, { useEffect, useState,useContext } from 'react'
import io from 'socket.io-client';
import '../pages/styles/chat.css';
// import Shresth from '../assets/me.png';
// import Vedant from '../assets/vedant.png';
// import Abhinandan from '../assets/abhinandan.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const socket = io('http://localhost:5000');


const Chat = () => {


    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [socketID, setSocketID] = useState('');
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserContext)


    useEffect(() => {

        const fetchData = async() =>{
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    navigate('/');
                    return;
                }
    
                const config = {
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token': token
                    }  
                }

                const res = await axios.get('http://localhost:5000/api/auth/me',config);
                setUser(res.data);

                const usersResponse = await axios.get('http://localhost:5000/api/auth/users',config);
                setUsers(usersResponse.data);

                const messageResponse = await axios.get('http://localhost:5000/api/messages',config);
                setMessages(messageResponse.data);

            } catch (error) {
                console.log(error);
            }
        }


        fetchData();    

        socket.on('connect', ()=>{
            setSocketID(socket.id);
            console.log('Connected',socket.id);
        })

        socket.on('chat message', (msg) => {
            if(msg.id != socketID){
                setMessages((prevMessages) => [...prevMessages,{ text: msg.text, sender: 'other' }]);
            }
            
        });

        return () => {
            socket.off('connect');
            socket.off('chat message');
        };

       
    }, [navigate,setUser,socketID]);


    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        }
    }  

    const senderId = user._id 
    console.log(senderId)

    if (!selectedUser || !selectedUser._id) {
        console.error('No valid user selected');
        return;
      }
    
       const res = await axios.post('http://localhost:5000/api/messages', { text:message,receiverId:selectedUser._id,senderId}, config);
       setMessages([...messages, { text: message, sender: 'self' },res.data]);
       setMessage('');

        } catch (error) {
            console.log('Error submitting message',error)
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
            Hi,{user?.username}
            {/* <button class="navbar-button">Login</button>
            <button class="navbar-button">Sign Up</button> */}
        </div>
    </nav>
      <div className="container-xxl">
    
        <div className="users">
        <div className="user-list-container">
          <div className="user-header">
          <h2>Users</h2>
          </div>
        
        <ul class="user-list">
             {users.map((u) => (
                <li key={u._id} className="user-item" onClick={()=>setSelectedUser(u)}>
                  <img src={u.avatar} alt={u.username} className="user-avatar" />
                  <span className="user-name">{u.username}</span>
                </li>
              ))}
            {/* <li class="user-item">
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
            </li> */}
        </ul>

        </div>
        </div>

        <div className="chats">
        <div class="chat-header">
            <h2>Chat with {selectedUser ? selectedUser.username : '...'}</h2>
        </div>
        <div class="chat-messages">
            {/* <div class="message">
                <div class="message-content">Hello, how are you?</div>
            </div>
            <div class="message user">
                <div class="message-content">I'm good, thanks! How about you?</div>
            </div> */}
        <div>
                {messages.filter((msg) => (msg.sender?._id === selectedUser?._id || msg.receiver?._id === selectedUser?._id)).map((msg, index) => (
    msg.sender?._id === user._id ?
    (<div className='message' key={index}><div className='message-content'>{msg.text}</div></div>)
    :
    (<div className='message user' key={index}><div className='message-content'>{msg.text}</div></div>)
))}

        </div>
        </div>
        
        <form class="chat-input" onSubmit={handleSubmit}>
            <input type="text" className='message-input' value={message} placeholder="Type a message..." onChange={(e)=>setMessage(e.target.value)} />
            <button type='submit' className='send-button'>Send</button>
        </form>
        </div>

      </div>
    </div>
  )
}

export default Chat