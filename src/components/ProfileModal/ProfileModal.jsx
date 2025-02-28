// import { Modal, useMantineTheme } from "@mantine/core";

// function ProfileModal({ modalOpened, setModalOpened }) {
//   const theme = useMantineTheme();

//   return (
//     <Modal
//       overlayColor={
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[9]
//           : theme.colors.gray[2]
//       }
//       overlayOpacity={0.55}
//       overlayBlur={3}
//       size="55%"
//       opened={modalOpened}
//       onClose={() => setModalOpened(false)}
//     >
//       <form className="infoForm">
//         <h3>Your info</h3>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="FirstName"
//             placeholder="First Name"
//           />

//           <input
//             type="text"
//             className="infoInput"
//             name="LastName"
//             placeholder="Last Name"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="worksAT"
//             placeholder="Works at"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="livesIN"
//             placeholder="LIves in"
//           />

//           <input
//             type="text"
//             className="infoInput"
//             name="Country"
//             placeholder="Country"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             placeholder="RelationShip Status"
//           />
//         </div>


//         <div>
//             Profile Image 
//             <input type="file" name='profileImg'/>
//             Cover Image
//             <input type="file" name="coverImg" />
//         </div>

//         <button className="button infoButton">Update</button>
//       </form>
//     </Modal>
//   );
// }

// export default ProfileModal;




import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesIn"
            className="infoInput"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Relationship status"
            name="relationship"
          />
        </div>

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;