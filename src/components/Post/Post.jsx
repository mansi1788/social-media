import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.jpg";
import Heart from "../../img/like.png";
import NotLike from "../../img/NotLike.jpg";
import { likePost } from "../../api/PostRequest";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
 
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(
    Array.isArray(data.likes) && data.likes.includes(user._id)
  );

  const [likes, setLikes] = useState(Array.isArray(data.likes) ? data.likes.length : 0);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)

  };

  return (

    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />

        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        {/* <span>{data.desc}</span> */}
      </div>
    </div>

  );
};

export default Post;