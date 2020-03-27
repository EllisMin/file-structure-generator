import React from "react";
import FormInput from "../FormInput";
import Button from "../Button";

import "./styles.scss";

// Render sub children recursively
const renderHelper = (elements, children, otherProps) => {
  const {
    childCount,
    handleAddChild,
    handleAddSubChild,
    handleInputChange,
    handleRemove
  } = otherProps;
  children.forEach((child, i) => {
    elements.push(
      <FormInput
        key={child.name}
        value={child.value}
        child={child}
        childCount={childCount}
        label={child.name}
        handleAddChild={handleAddChild}
        handleAddSubChild={handleAddSubChild}
        onChange={e => handleInputChange(e, child.name)}
        handleRemove={handleRemove}
        lastChild={children.length - 1 === i && child.level === 1}
      />
    );
    if (child.subChildren.length > 0) {
      renderHelper(elements, child.subChildren, otherProps);
    }
  });
  return elements;
};

const Form = ({ handleReset, handleSort, children, ...otherProps }) => {
  const elements = renderHelper([], children, otherProps);

  const reset = e => {
    e.preventDefault();
    handleReset();
  };

  const sort = e => {
    e.preventDefault();
    handleSort();
  };

  return (
    <form className="main-form">
      <div className="btn-container">
        <Button onClick={e => reset(e)}>Reset</Button>
        <Button onClick={e => sort(e)}>Sort A-Z</Button>
      </div>
      {elements}
    </form>
  );
};

export default Form;
