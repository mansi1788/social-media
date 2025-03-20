import React, { useEffect } from "react";
import './Posts.css';
import { getTimelinePosts } from "../../actions/postAction";
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    console.log("user._id////////////7777777777777777777///////",user._id)
    if (user?._id) {
      dispatch(getTimelinePosts(user._id));
    }
  }, [user?._id, dispatch]);  

  // Handle loading state
  if (loading) return <div>Loading posts...</div>;

  // Check if user data is available
  if (!user) {
    return <div>Loading user data...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }
  console.log("user._id/////////////////////////",user._id)

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }

  return (
    <div className="Posts">
      {posts.map((post) => (
        <Post key={post._id} data={post} />
      ))}
    </div>
  );
};

export default Posts;
