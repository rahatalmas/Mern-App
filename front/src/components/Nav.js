import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

const Nav = ({name,auth,signout})=>{
    return(
        <div className="nav-container">
            <div className="nav-header">
                <h3>Pin Your Stories</h3>
            </div>
            <div className="nav-links">
                <p>{name}</p>
                <Link className="link" to="/">Home</Link>
                <span className="sp" onClick={signout}>Logout</span>
            </div>
        </div>
    );
}

export default Nav;