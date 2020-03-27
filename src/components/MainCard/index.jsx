import React from "react";
import Form from "../Form";

import "./styles.scss";

const MainCard = ({
  children,
  childCount,
  handleAddChild,
  handleAddSubChild,
  handleReset,
  handleInputChange,
  handleRemove,
  handleSort
}) => {
  return (
    <div className="main-card">
      <h2>Text File Structure Generator</h2>
      <hr />
      <main>
        <Form
          children={children}
          childCount={childCount}
          handleAddChild={handleAddChild}
          handleAddSubChild={handleAddSubChild}
          handleReset={handleReset}
          handleInputChange={handleInputChange}
          handleRemove={handleRemove}
          handleSort={handleSort}
        />
      </main>
    </div>
  );
};

export default MainCard;
