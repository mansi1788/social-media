import React, { useState,useEffect } from 'react'
import './FollowerCard.css'
import User from '../User/User'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../api/UserRequest'

const FollowerCard = () => {
const [persons, setpersons] = useState([])
const {user} = useSelector((state)=>state.authReducer.authData);
    useEffect(()=>{
        const fetchPersons= async()=>{
            const {data} = await  getAllUsers();
            setpersons(data)
            console.log(data);

        };
        fetchPersons()
    },[])
  return (
    <div className="FollowerCard">
    <h3>Who is Following You</h3>

    {persons.map((person, id) => {

if (person._id !== user._id){
        <User person= {person} key = {id}/>
}
    
    

})}
</div>

  )
}

export default FollowerCard