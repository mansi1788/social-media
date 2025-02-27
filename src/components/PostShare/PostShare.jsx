import React, { useState, useRef } from "react";
import ProfileImage from '../../img/ProfileImage.jpg'
import "./PostShare.css";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };
  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      <div>
        <input type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
        <i class="fa-solid fa-image-landscape"></i>
        Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
          <i class="fa-solid fa-circle-play"></i>
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
          <i class="fa-solid fa-location-dot"></i>            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
          <i class="fa fa-calendar" aria-hidden="true"></i>
            Shedule
          </div>
          <button className="button ps-button">Share</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      {image && (

        <div className="previewImage">
         <i class="fa-solid fa-xmark" onClick={()=>setImage(null)}></i>
          <img src={image.image} alt="" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;