import React from 'react'
import './Post.css'

const Post = ({data}) => {
    return (
      <div className="Post">
          <img src={data.img} alt="" />
  
  
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