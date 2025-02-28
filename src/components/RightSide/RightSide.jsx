// import React, { useState } from "react";
// import "./RightSide.css";
// // import Noti from "../../img/noti.png";
// import TrendCard from "../TrendCard/TrendCard";
// import ShareModal from "../ShareModal/ShareModal";

// const RightSide = () => {
//   const [modalOpened, setModalOpened] = useState(false);
//   return (
//     <div className="RightSide">
//       <div className="navIcons">
//         {/* <img src={Home} alt="" /> */}
//         <i class="fa fa-home" aria-hidden="true"></i>

//         <i class="fi fi-rr-settings"></i>
//         <i class="fa-solid fa-bell"></i>
//         {/* <img src={Noti} alt="" /> */}
//         {/* <img src={Comment} alt="" /> */}
//         <i class="fa-solid fa-comment"></i>
//       </div>

//       <TrendCard />

//       <button className="button r-button" onClick={() => setModalOpened(true)}>
//         Share
//       </button>
//       <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
//     </div>
//   );
// };

// export default RightSide;



import React, { useState } from "react";
import "./RightSide.css";

import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      {/* Side Navbar */}

      <NavIcons />
      {/* TrendCard */}
      <TrendCard />

      {/* Share buttong */}
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;