import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation } from 'react-router';
import moment from 'moment';

const Write = () => {
  
  const state = useLocation().state
  const [value, setValue] = useState(state?.desc||'');
  const [title, setTitle] = useState(state?.title||'');
  const [file,setFile]=useState(null);
  const [category,setCategory ] = useState(state?.cat||'');

  const upload = async()=>{
    try{
      const formData = new FormData();
      formData.append("file",file)
      const res = await axios.post("http://localhost:8800/api/upload",formData)
      console.log(res.data);
      return res.data
      
    }catch(err){
      console.log(err);
      
    }
  }
  const handleClick = async e=>{
    e.preventDefault()
    const imgURL= await upload()
    try{
      state ? await axios.put(`http://localhost:8800/api/posts/${state.id}`,{title,desc:value,category,img : file ? imgURL : ""},{withCredentials:true}):
      await axios.post(`http://localhost:8800/api/posts/`,{title,desc:value,category,img : file ? imgURL : "",date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")},{withCredentials:true})
    }
    catch(err){
      console.log(err);
      
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">Upload image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" name="cat" checked={category==='art'} value="art" id="art" onChange={e=>setCategory(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category==='science'} name="cat" value="science" id="science" onChange={e=>setCategory(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category==='technology'} name="cat" value="technology" id="technology" onChange={e=>setCategory(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category==='cinema'} name="cat" value="cinema" id="cinema" onChange={e=>setCategory(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category==='design'} name="cat" value="design" id="design" onChange={e=>setCategory(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
            <div className="cat">
              <input type="radio" checked={category==='food'} name="cat" value="food" id="food" onChange={e=>setCategory(e.target.value)}/>
                <label htmlFor="food">Food</label>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Write
