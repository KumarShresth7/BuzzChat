import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path= '/chat' element = {<Chat/>}/>
          <Route path='/register' element = {<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
