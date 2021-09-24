import React, { useEffect, useState } from 'react';
import Form from './form.js';
import MemoryJar from './memoryJar.js';
import './home.css';
import axios from 'axios';

const Home = ({name,password}) =>{
   const[title,setTitle]=useState('');
   const[story,setStory]=useState('');
   const[file,setFile]=useState('');
   const[posts,setPosts]=useState([]);
   
   const handleChangeTitle=(e)=>{
      setTitle(e.target.value);
   }
   const handleChangeStory=(e)=>{
      setStory(e.target.value);
   }
   const handleChangeFile=(e)=>{
      setFile(e.target.files[0]);
   }

   const postSubmit=(e)=>{
      e.preventDefault();
      const newpost = {name,title,story};
      if(file){
         const data = new FormData();
         const filename = Date.now()+file.name;
         data.append("name",filename);
         data.append("file",file);
         newpost.photo=filename;
         axios.post('http://localhost:5000/image/upload',data)
          .then(res=>{
             console.log('file uploaded');
          })
          .catch(err=>{
             console.log(err);
          })
      }
      axios.post('http://localhost:5000/post',newpost)
      .then(result=>{
         console.log('posted...');
      })
      .catch(err=>{
         console.log(err);
      })
      setPosts((prevPost)=>[...prevPost,newpost]);
      setTitle('');
      setStory('');
      setFile('');
   }

   useEffect(()=>{
       axios.get(`http://localhost:5000/posts/${name}`)
       .then(result=>{
           setPosts(result.data);
       })
     },[])

    return(
       <div className="home-container">
          <Form handleChangeTitle={handleChangeTitle}
           handleChangeStory={handleChangeStory} 
           handleChangeFile={handleChangeFile}
           postSubmit={postSubmit}/>
          {posts && <MemoryJar posts={posts}/>}
       </div>
    );
}

export default Home;