import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import './App.css';
import Home from './components/home';
import Nav from './components/Nav';
import Login from './components/login';
import SinglePost from './components/singlePost';
import Modal from 'react-modal'

Modal.setAppElement('#root');
function App(){
 
  const[name,setName]=useState('');
  const[password,setPassword]=useState('');
  const[auth,setAuth] = useState(false);
  const[message,setMessage]=useState('');

  const handleChangeName = (e)=>{
    setName(e.target.value);
  }
  const handleChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  const signUpHandler = (e) =>{
      e.preventDefault();
      axios.post('http://localhost:5000/register',{name,password})
       .then(result=>{
         setMessage(result.data.message);
         if(result.data.message==="success"){
           setAuth(true);
           console.log(result.data);
         }
       })
       .catch(err=>{
         console.log(err);
       })
  }

  const loginControll = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/login',{name,password})
     .then(result=>{
        setMessage(result.data.message);
        if(result.data.message==="success"){
        setAuth(true);
        localStorage.setItem("user",JSON.stringify({name:name,password:password}));
        }
     })
     .catch(err=>{
         alert(err)
     })
  }


  const singout = (e)=>{
    setAuth(false);
    setName('');
    setMessage('');
    setPassword('');
    window.location.replace('/')
  }

  return (
    <div className="App">

      <Router>
        {auth && <Nav auth={auth} name={name} signout={singout}/>}
        <Route exact path="/">
            {
              auth ?
                <Home name={name} password={password} />:
                <Login
                    signUpHandler={signUpHandler}
                    loginControll={loginControll}
                    handleChangeName={handleChangeName}
                    handleChangePassword={handleChangePassword}
                    message={message}
                />
            }
         </Route>
         <Route path="/:id">            
         {
              auth ?
                <SinglePost/>:
                <Login
                    signUpHandler={signUpHandler}
                    loginControll={loginControll}
                    handleChangeName={handleChangeName}
                    handleChangePassword={handleChangePassword}
                    message={message}
                />
            }
          </Route>
      </Router>
    </div>
  );
}

export default App;
