import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';
import { UserContextProvider } from './context/userContext';




function App() {
  return (
    <div>
      <UserContextProvider>
      <Router>
        <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path= '/chat' element = {<Chat/>}/>
          <Route path='/register' element = {<Register/>}/>
        </Routes>
      </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
