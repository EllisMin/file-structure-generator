import React from "react";
import Form from "../Form";

import "./styles.scss";

const MainCard = ({
  children,
  handleAddChild,
  handleAddSubChild,
  handleReset,
  handleInputChange,
  handleRemove
}) => {
  return (
    <div className="main-card">
      <h2>Text File Structure Generator</h2>
      <hr />
      <main>
        <Form
          children={children}
          handleAddChild={handleAddChild}
          handleAddSubChild={handleAddSubChild}
          handleReset={handleReset}
          handleInputChange={handleInputChange}
          handleRemove={handleRemove}
        />
      </main>
    </div>
  );
};

export default MainCard;
