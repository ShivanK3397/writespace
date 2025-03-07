import React,{useState,useEffect,useContext} from 'react'
import Logo from "../images/writespacelogo.jpg"
import Edit from "../images/edit.png"
import Delete from "../images/delete.png"
import { Link,useLocation,useNavigate} from 'react-router';
import Menu from '../components/Menu';
import moment from "moment"
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import DOMPurify from "dompurify"
const Single = () => {
  const [post,setPost] = useState({})

  const loc = useLocation()
  const navigate = useNavigate()

  const postId = loc.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext)

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
        setPost(res.data)
        
        
        
        
      }catch(err){
        console.log(err);
        
      }
    }
    fetchData();
  },[postId])

  const handleDelete = async()=>{
    try{
     await axios.delete(`http://localhost:8800/api/posts/${postId}`,{
      withCredentials:true
     })
      navigate("/")
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={`..upload/${post?.img}`} alt="" /> 
        <div className="user">
          {post.userIMG && <img src={post.userIMG} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
        {currentUser&&currentUser.username===post.username&&<div className="edit">
          <Link to={`/write?edit=2`} state={post}>
          <img src={Edit} alt="" />
          </Link> 
          <img onClick={handleDelete} src={Delete} alt="" />
        </div>}
        </div>
        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}></p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single
