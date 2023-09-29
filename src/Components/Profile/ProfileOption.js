import React,{useState,useEffect} from 'react'
import './Profile.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar } from '@mui/material'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProfilePic from '../ProfilePic/ProfilePic';
import {useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProfileOption() {
  const navigate=useNavigate();
  var picLink="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
  const[posts,setPosts]=useState([]);
  const[user,setUser]=useState("");
  const[changePic,setChangePic]=useState(false)
  // const[pic,setPic]=useState("")

  const DeletePost=(posts)=>{
    if(window.confirm('Do you really want to delete this post?')){
     fetch(`http://localhost:5000/delposts/${posts}`,{
    
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  }
  }


  const changeProfile= ()=>{
    if(changePic){
      setChangePic(false)
    }
    else{
      setChangePic(true)
    }
  }


  useEffect(()=>{
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
    
      headers:{
        'Content-Type':'application/json',
        'Authorization':"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{
      // setPic(result.post)
      setUser(result.user)
      // console.log(pic)
      console.log(result)
      setPosts(result.post)
    })
  },[])

  return (
    <div className='ProfileOption'>      
        <div className="ProfileHeader">
            <h2>
              {JSON.parse(localStorage.getItem("user")).name}
            </h2>
            <p>{posts?posts.length:"0"} Tweets</p>
            <KeyboardBackspaceIcon className='Arrow' onClick={()=>{navigate('/'); }}/>
        </div>
        <div className="ProfileImg">
            <img src={user.BgPhoto ? user.BgPhoto : ""} alt="" style={{backgroundColor:"rgba(0, 0, 0, 0.3)"}}  className='banner'/>
            </div>

            <div className="UserImg">
            <Avatar className='ProfPic'
             alt="Remy Sharp" 
            src={user.Photo ? user.Photo : picLink}
            sx={{ width: 130, height: 130 }}
            />
            <button className='Editbtn' onClick={changeProfile}>Edit profile</button>
            </div>

            <div className="ProfileContent">
            <h2>{user.name}</h2>
            <p>@{user.userName}</p>
           <br />
           <p>{user.bio?user.bio : "Hey there! I am using twitter." }</p>
            <br />
  
            <div className="Following">
            <p><span>{user.following?user.following.length:"0"} </span> Following</p>
                <p><span>{user.followers?user.followers.length:"0"}</span> Followers</p>
            </div>

            <div className="ProfNav">
               <ul>
                <li>Tweets</li>
                <li>Replies</li>
                <li>Media</li>
                <li>Likes</li>
               </ul>
            </div>
            </div>


            <section className='ProfPost'>
            
            {posts.map(data=>(
              <div key={data._id} className='Post'>
              <div className="PostAvatar">
                   <Avatar 
                   src={user.Photo ? user.Photo : picLink}/>
               </div>
               <div className="PostBody">
                  <div className="PostHeader">
                      <div className="PostHeaderText">
                          <h3>{user.name}{"  "}
                              <span>
                              @{user.userName} - {data.postedAt}
                              </span>
                          </h3>
                          </div>
                  <div className="PostHeaderDescription">
                      <p>{data.body}</p>
                      
                  </div>
              </div>
              <img src={data.photo} alt="" />
  
          <div className="PostFooter">
              <ChatBubbleOutlineOutlinedIcon fontSize='small' className='FooterIcon' />
              <RepeatOutlinedIcon fontSize='small' className='FooterIcon' />
                    <FavoriteIcon fontSize='small' className='FooterIcon'  sx={{ color: '#f91880' }}  />
              <DeleteIcon fontSize='small' className='FooterIcon' onClick={()=>{
            DeletePost(data._id);
            navigate('/');
          }}/>          
          </div>
      </div>
  </div>

             ))} 

</section>
{
  changePic &&
  <ProfilePic changeProfile={changeProfile}/>
}
    </div>
  )
}