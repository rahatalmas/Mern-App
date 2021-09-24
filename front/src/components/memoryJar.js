import React from 'react';
import {Link} from 'react-router-dom'
import './memoryjar.css';

const MemoryJar=({posts})=>{
    const pf="http://localhost:5000/images/";
    return(
        <div className="jar-container">
           {
               posts.map(post=>(
                   
                        <div className="m-jar" key={post._id} >
                            <Link className="single-post-link" to={`/${post._id}`} >
                                <img className="jar-image" src={pf+post.photo}/>
                                <h3>{post.title}</h3>
                                <p>{post.story.substr(0,30)}...</p>
                            </Link>
                        </div>
                   
               ))
           }

        </div>
    );
}

export default MemoryJar;