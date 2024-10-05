import React, {useState} from "react";
import ProjectDetailsModal from "../ProjectDetailsModal";

const WorkCard = ({ img, name, description, project, onClick }) => {
  // State for controlling modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Handler for showing the modal
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <div
        className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link"
        onClick={showModal}
      >
        <div
          className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
          style={{ height: "600px" }}
        >
          <img
            alt={name}
            className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
            src={img}
          ></img>
        </div>
        <h1 className="mt-5 text-3xl font-medium">
          {name ? name : "Project Name"}
        </h1>
        <h2 className="text-xl opacity-50">
          {description ? description : "Description"}
        </h2>
      </div>

      {/* Add the ProjectDetailsModal and pass necessary props */}
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
