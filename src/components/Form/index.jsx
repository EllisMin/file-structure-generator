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
        id={i}
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

const Form = ({ handleReset, ...otherProps }) => {
  const elements = renderHelper([], otherProps.children, otherProps);

  const reset = e => {
    e.preventDefault();
    handleReset();
  };

  return (
    <form className="main-form">
      <Button className="btn-reset" onClick={e => reset(e)}>
        Reset
      </Button>
      {elements}
    </form>
  );
};

export default Form;
