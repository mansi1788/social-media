import React, { useState, useEffect } from 'react';
import './FollowerCard.css';
import User from '../User/User';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../api/UserRequest';
import FollowersModal from "../FollowModal/FollowModal";

const FollowerCard = ({ location }) => {
  const [persons, setPersons] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { data } = await getAllUsers();
        setPersons(data);
        console.log("Fetched Users:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchPersons();
  }, []);

  if (!user || !persons) {
    return <div>Loading followerCard...</div>;
  }

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => (
        person._id !== user._id ? <User person={person} key={id} /> : null
      ))}

      {!location && (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      )}

      <FollowersModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default FollowerCard;
