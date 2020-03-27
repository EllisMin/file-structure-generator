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
  const addChild = e => {
    e.preventDefault();
    const newChild = {
      name: `child-${childCount + 1}`,
      level: child.level,
      value: "",
      subChildren: []
    };
    handleAddChild(newChild);
  };

  const addSubChild = e => {
    e.preventDefault();
    handleAddSubChild(child);
  };

  const removeChild = e => {
    e.preventDefault();
    handleRemove(child.name);
  };

  const marginLeft = child ? `${child.level * 13}px` : `0.5rem`;

  return (
    <div className="form-group" style={{ marginLeft: marginLeft }}>
      <label>{label}</label>
      <input type="text" {...otherProps} />
      <div className="btn-container">
        {label !== "root" && (
          <>
            <Button onClick={e => addSubChild(e)}>+sub</Button>
            {lastChild && <Button onClick={e => addChild(e)}>+</Button>}
            {label !== "child-1" && (
              <Button onClick={e => removeChild(e)}>-</Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormInput;
