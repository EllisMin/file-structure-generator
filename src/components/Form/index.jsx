import React from "react";
import FormInput from "../FormInput";
import Button from "../Button";

import "./styles.scss";

// Render sub children recursively
const renderHelper = (
  elements,
  children,
  handleAddChild,
  handleAddSubChild,
  handleInputChange
) => {
  children.forEach((child, i) => {
    elements.push(
      <FormInput
        key={child.name}
        id={i}
        value={child.value}
        child={child}
        label={child.name}
        handleAddChild={handleAddChild}
        handleAddSubChild={handleAddSubChild}
        onChange={e => handleInputChange(e, child.name)}
        lastChild={children.length - 1 === i && child.level === 1}
      />
    );
    if (child.subChildren.length > 0) {
      renderHelper(
        elements,
        child.subChildren,
        handleAddChild,
        handleAddSubChild,
        handleInputChange
      );
    }
  });
  return elements;
};

const Form = ({
  handleAddChild,
  handleAddSubChild,
  handleReset,
  handleInputChange,
  children
}) => {
  const elements = renderHelper(
    [],
    children,
    handleAddChild,
    handleAddSubChild,
    handleInputChange
  );

  const reset = e => {
    e.preventDefault();
    handleReset();
  };

  return (
    <form className="main-form">
      {elements}
      <Button className="btn-reset" onClick={e => reset(e)}>
        Reset
      </Button>
    </form>
  );
};

export default Form;
