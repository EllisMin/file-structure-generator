import React from "react";
import Button from "../Button";

import "./styles.scss";

const FormInput = ({
  label,
  child,
  childCount,
  handleAddChild,
  handleAddSubChild,
  lastChild,
  handleRemove,
  ...otherProps
}) => {
  const addChild = (e) => {
    e.preventDefault();
    const newChild = {
      name: `child-${childCount + 1}`,
      level: child.level,
      value: "",
      subChildren: [],
    };
    handleAddChild(newChild);
  };

  const addSubChild = (e) => {
    e.preventDefault();
    handleAddSubChild(child);
  };

  const removeChild = (e) => {
    e.preventDefault();
    handleRemove(child.name);
  };

  const marginLeft = child ? `${child.level * 13}px` : `0.5rem`;

  return (
    <div className="form-group" style={{ marginLeft: marginLeft }}>
      <label>{label}</label>
      <input className="input-custom" type="text" {...otherProps} />
      <div className="btn-container">
        {label !== "root" && (
          <>
            <Button onClick={(e) => addSubChild(e)}>↓</Button>
            {label !== "child-1" && (
              <Button className="btn-delete" onClick={(e) => removeChild(e)}>
                -
              </Button>
            )}
            {lastChild && (
              <Button className="btn-add" onClick={(e) => addChild(e)}>
                +
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormInput;
