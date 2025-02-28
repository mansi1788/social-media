// import React from "react";
// import Cover from "../../img/coverr.jpg";
// import Profile from "../../img/ProfileImage.jpg";
// import "./ProfileCard.css";
// import { useSelector } from "react-redux";

// const ProfileCard = () => {
//   const {user} = useSelector((state)=>state.authReducer.authData)

//   const ProfilePage = true;
//   return (
//     <div className="ProfileCard">
//       <div className="ProfileImages">
//         <img src={user.Cover} alt="" />
//         <img src={Profile} alt="" />
//       </div>

//       <div className="ProfileName">
//         <span>Zendaya MJ</span>
//         <span>Senior UI/UX Designer</span>
//       </div>

//       <div className="followStatus">
//         <hr />
//         <div>
//           <div className="follow">
//             <span>6,890</span>
//             <span>Followings</span>
//           </div>
//           <div className="vl"></div>
//           <div className="follow">
//             <span>1</span>
//             <span>Followers</span>
//           </div>

//           {ProfilePage && (
//             <>
//               <div className="vl"></div>
//               <div className="follow">
//                 <span>3</span>
//                 <span>Posts</span>
//               </div>
//             </>
//           )}
//         </div>
//         <hr />
//       </div>
//       {ProfilePage ? "" : <span>My Profile</span>}
//     </div>
//   );
// };

// export default ProfileCard;



import React from "react";
import "./ProfileCard.css";

// import Cover from "../../img/coverr.jpg";
// import defaultProfile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic +"defaultCover.jpg"
          } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === user._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;