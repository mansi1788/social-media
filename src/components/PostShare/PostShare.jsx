// import React, { useState, useRef } from "react";
// import ProfileImage from '../../img/ProfilePicture.jpg'
// import "./PostShare.css";
// import { uploadImage } from "../../actions/uploadAction";
// import { useDispatch, useSelector } from "react-redux";
// import { uploadPost } from "../../api/UploadRequest";

// //ijioop
// const PostShare = () => {

//   const dispatch = useDispatch();
//   const [image, setImage] = useState(null);
//   const imageRef = useRef();
//   const { user } = useSelector((state) => state.authReducer.authData);
//   const loading = useSelector((state) => state.postReducer.uploading);
//   const desc = useRef();

//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       let img = event.target.files[0];
//       setImage(img);
//     }
//   };
 
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     //post data
//     const newPost = {
//       userId: user._id,
//       desc: desc.current.value,
//     };

//     // if there is an image with post
//     if (image) {
//       const data = new FormData();
//       const fileName = Date.now() + image.name;
//       data.append("name", fileName);
//       data.append("file", image);
//       newPost.image = fileName;
//       console.log(newPost);
//       try {
//         dispatch(uploadImage(data));
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     dispatch(uploadPost(newPost));
//     resetShare();
//   };
//   const resetShare = () => {
//     setImage(null);
//     desc.current.value = "";
//   };


//   return (
//     <div className="PostShare">
//       <img src={ProfileImage} alt="" />
//       <div>
//         <input
//         ref = {desc}
//         required
//         type="text" placeholder="What's happening" />
//         <div className="postOptions">
//           <div className="option" style={{ color: "var(--photo)" }}
//           onClick={()=>imageRef.current.click()}
//           >
//         <i class="fa-solid fa-image-landscape"></i>
//         Photo
//           </div>
//           <div className="option" style={{ color: "var(--video)" }}>
//           <i class="fa-solid fa-circle-play"></i>
//             Video
//           </div>{" "}
//           <div className="option" style={{ color: "var(--location)" }}>
//           <i class="fa-solid fa-location-dot"></i>            Location
//           </div>{" "}
//           <div className="option" style={{ color: "var(--shedule)" }}>
//           <i class="fa fa-calendar" aria-hidden="true"></i>
//             Sehdule
//           </div>
//           <button
//             className="button ps-button"
//             onClick={handleUpload}
//             disabled={loading}
//           >
//             {loading ? "uploading" : "Share"}
//           </button>

//           <div style={{ display: "none" }}>
//             <input
//               type="file"
//               name="myImage"
//               ref={imageRef}
//               onChange={onImageChange}
//             />
//           </div>
//         </div>
//       {image && (

//         <div className="previewImage">
//          <i class="fa-solid fa-xmark" onClick={()=>setImage(null)}></i>
//          <img src={URL.createObjectURL(image)} alt="preview" />
//         </div>

//       )}


//       </div>
//     </div>
//   );
// };

// export default PostShare;




import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction.js";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile"
      />
      <div>
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;