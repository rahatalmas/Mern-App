import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import Modal from 'react-modal';

const Login = ({loginControll,handleChangeName,handleChangePassword,message,signUpHandler})=>{
    const [modal,setmodal]=useState(false);
    const openModal=()=>{
        setmodal(true);
    }
    const closeModal=()=>{
        setmodal(false);
    }
    return(
        <div className="app-font">
            <div className="welcome-message">
               <img className="welcome-img" src="/images/439.jpg"/>
               <h1>pin your story</h1>
               <p>... enjoy your life and
                   save your memories ...
               </p>
            </div>
            <div className="login-container">
                <p>{message}</p>
                <form onSubmit={loginControll} >
                    <input className="login-input" type="text" required placeholder="username ..." onChange={handleChangeName}/>
                    <input className="login-input" type="password" required placeholder="password ..." onChange={handleChangePassword}/>
                    <button className="login-btn">login</button>
                </form>
                <div className="signupandforget">
                    <span  className="l-s-p">forget password</span>
                    <span onClick={openModal} className="l-s-p" to="/signup">signUp</span>
                </div>
                <Modal isOpen={modal} className="modal-container" >
                   <div className="signup-container">
                        <p>{message}</p>
                        <form onSubmit={signUpHandler} >
                            <input className="login-input" type="text" required placeholder="username ..." onChange={handleChangeName}/>
                            <input className="login-input" type="password" required placeholder="password ..." onChange={handleChangePassword}/>
                            <button className="login-btn">signUp</button>
                        </form>
                    </div>    
                </Modal>
            </div>
        </div>
    );
}

export default Login;