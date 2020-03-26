import React, { useState } from "react";
import Form from "../Form";

import "./styles.scss";

const child = {
  name: "child-1",
  level: 1,
  subChildren: []
};

// Find sub child recursive and replace with updated child
const findSubChild = (list, updatedChild) => {
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    if (child.name === updatedChild.name) {
      list[i] = updatedChild;
    } else if (
      child.subChildren.length > 0 &&
      updatedChild.name.includes(child.name)
    ) {
      findSubChild(child.subChildren, updatedChild);
    }
  }
  return list;
};

const MainCard = () => {
  const [children, setChildren] = useState([child]);

  const handleAddChild = newChild => {
    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
  };

  const handleAddSubChild = curChild => {
    const subChildren = [...curChild.subChildren];
    const len = subChildren.length;
    const newSubChild = {
      name: `${curChild.name}-${len + 1}`,
      level: curChild.level + 1,
      subChildren: []
    };
    subChildren.push(newSubChild);
    const updatedChild = {
      name: curChild.name,
      level: curChild.level,
      subChildren: subChildren
    };

    const updatedChildren = findSubChild([...children], updatedChild);

    setChildren(updatedChildren);
  };

  return (
    <div className="main-card">
      <h2>Text File Structure Generator</h2>
      <hr />
      <main>
        <Form
          children={children}
          handleAddChild={handleAddChild}
          handleAddSubChild={handleAddSubChild}
        />
      </main>
    </div>
  );
};

export default MainCard;