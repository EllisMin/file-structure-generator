import React from "react";
import FormInput from "../FormInput";
import Button from "../Button";

import "./styles.scss";

// Generate sub children recursively
const renderHelper = (
  elements,
  children,
  handleAddChild,
  handleAddSubChild
) => {
  children.forEach((child, i) => {
    elements.push(
      <FormInput
        key={child.name}
        id={i}
        child={child}
        label={child.name}
        handleAddChild={handleAddChild}
        handleAddSubChild={handleAddSubChild}
        lastChild={children.length - 1 === i && child.level === 1}
      />
    );
    if (child.subChildren.length > 0) {
      renderHelper(
        elements,
        child.subChildren,
        handleAddChild,
        handleAddSubChild
      );
    }
  });
  return elements;
};

const Form = ({ handleAddChild, handleAddSubChild, children }) => {
  const elements = renderHelper(
    [],
    children,
    handleAddChild,
    handleAddSubChild
  );

  return (
    <form className="main-form">
      <Button className="btn-reset">Reset</Button>
      <FormInput label="root" isRoot />
      {elements}
      <Button>Submit</Button>
    </form>
  );
};

export default Form;
