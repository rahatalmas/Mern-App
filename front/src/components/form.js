import React from 'react'
import './form.css';

const Form = ({handleChangeStory,handleChangeTitle,postSubmit,handleChangeFile})=>{
    return(
        <div className="form-container">
            <form onSubmit={postSubmit}>
                <input className="f-input" type="text" required placeholder="story name..." onChange={handleChangeTitle}/>
                <textarea className="f-input" type="text" required placeholder="write your story..." onChange={handleChangeStory} />
                <input className="f-input" type="file" required placeholder="select you moment..." onChange={handleChangeFile}/>
                <input className="f-btn" type="submit" value="post"/>
            </form>
        </div>
    );
}

export default Form;