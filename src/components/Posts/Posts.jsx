import React, { useEffect } from "react";
import './Posts.css'
import { getTimelinePosts } from "../../actions/postAction";
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from "react-router-dom";


const Posts = () => {

  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
    {PostsData.map((post, id) => {
        return <Post data={post} id={id}/>
})}
</div>

  )
}

export default Posts