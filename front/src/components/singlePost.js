import axios from 'axios';
import React from 'react';
import './singlepost.css';
import { useState,useEffect } from 'react';
import { useLocation,useHistory } from 'react-router';
import { FaRegTrashAlt} from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const SinglePost = ()=>{

    const location = useLocation();
    const id = location.pathname.split('/')[1];
    const history = useHistory();
    const[singlepost,setSinglepost]=useState({});
    const[edit,setEdit]=useState(false);
    const [title,setTitle]=useState('');
    const [story,setStory]=useState(''); 
    const[name,setName]=useState('');

    useEffect(()=>{
       // console.log(id);
        axios.get(`http://localhost:5000/${id}`)
         .then(result=>{
             setSinglepost(result.data)
             setTitle(result.data.title);
             setStory(result.data.story);
             setName(result.data.name);
         })
    },[id]);

    const deleteHandler=()=>{
        axios.delete(`http://localhost:5000/${id}`)
         .then(result=>{
             console.log(result.data);
             history.push('/');
         })
         .catch(err=>{
             console.log(err);
         })
    }

    const updateHandler=()=>{
        axios.put(`http://localhost:5000/${id}`,{name:name,title:title,story:story})
         .then(result=>{
             console.log('post updated')
             setSinglepost(result.data)
         })
         .catch(err=>{
             console.log(err);
         })
         setEdit(false);
    }

    const pf="http://localhost:5000/images/"
    return(
        
        <div className="single-post-container">
            <div className="single-p-head">
                <div>
                   <p>{singlepost.name}</p>
                   <span >{new Date(singlepost.createdAt).toDateString()}</span>
                </div>
                <div>
                    <span className="sp" onClick={()=>{setEdit(true)}}><MdModeEdit/></span><span className="sp" onClick={deleteHandler}><FaRegTrashAlt/></span>
                </div>
            </div>
            <div>
                <img className="single-p-img" src={pf+singlepost.photo}/>

                <h3>{edit?<input value={title} onChange={(e)=>setTitle(e.target.value)}/>:singlepost.title}</h3>
                <p>{edit?<textarea value={story} onChange={(e)=>setStory(e.target.value)}/>:singlepost.story}</p>
                {edit && <button
                onClick={updateHandler}>update</button>}
            </div>
        </div>
    )
}

export default SinglePost;