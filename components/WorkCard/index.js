import React, { useState } from "react";
import ProjectDetailsModal from "../ProjectDetailsModal";
import styles from "./WorkCard.module.css";

const WorkCard = ({ img, name, description, project, onClick }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <div className={styles.workCard} onClick={showModal}>
        <div className={styles.imageContainer}>
          <img
            alt={name}
            className={styles.projectImage}
            src={img}
          />
        </div>
        <h1 className={styles.projectName}>
          {name ? name : "Project Name"}
        </h1>
        <h2 className={styles.projectDescription}>
          {description ? description : "Description"}
        </h2>
      </div>

      {modalVisible && (
        <ProjectDetailsModal
          show={modalVisible}
          onHide={hideModal}
          data={project}
        />
      )}
    </>
  );
};

export default WorkCard;