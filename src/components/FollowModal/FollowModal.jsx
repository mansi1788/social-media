import React from "react";
import { Modal } from "@mantine/core";
import FollowersCard from "../FollowerCard/FollowerCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  return (
    <Modal
      overlayProps={{
        color: "black",
        opacity: 0.5,
        blur: 3,
      }}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <FollowersCard location="modal" />
    </Modal>
  );
};

export default FollowersModal;
