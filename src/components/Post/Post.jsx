import React,{useState} from 'react'
import './Post.css'
import { useSelector } from 'react-redux'

const Post = ({data}) => {
  const{user} = useSelector((state)=>state.authReducer.authData)
  // const [liked, setliked] = useState(data.likes.includes(user._id))
  // const [likes, setlikes] = useState(data.likes.length)
    return (
      <div className="Post">
        <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
          <img src={data.img} alt="" />+  
          <div className="postReact">
          <i class="fa-solid fa-heart"></i>
              {/* <img src={data.liked?Heart: NotLike} alt="" /> */}
              {/* <img src={Comment} alt="" /> */}
              <i class="fa-solid fa-comment"></i>
              <i class="fa-solid fa-share"></i>
              {/* <img src={Share} alt="" /> */}
          </div>
  
  
          <span style={{color: "var(--gray)", fontSize: '12px'}}>{data.likes} likes</span>
  
          <div className="detail">
              <span><b>{data.name}</b></span>
              <span> {data.desc}</span>
          </div>
      </div>
    )
  }

export default Post