import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logout } from "../../actions/AuthAction";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogOut = () => {
    dispatch(logout());
  };
  console.log("user._id........................",user._id)
  console.log("profileUserId.......................",profileUserId)
  console.log("profileUser...................",profileUser)



  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log("user._id........................",user._id)
      } else {
        console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log("profileUser..................................",profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);



  console.log("✅ Modal Opened State:", modalOpened);

  

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>

        {user._id === profileUserId ? (
          <div>

            <h6 onClick={() => { 
              console.log("✅ Clicked Edit Button!"); 
              setModalOpened(true); 
            }}>
              Edit
            </h6>

            <ProfileModal 
              modalOpened={modalOpened} 
              setModalOpened={setModalOpened} 
              data={profileUser} 
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span><b>Status </b></span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span><b>Lives in </b></span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span><b>Works at </b></span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default InfoCard;
