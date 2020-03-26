import React, { useState } from "react";
import MainCard from "../MainCard";
import Result from "../Result";

import "./styles.scss";

const rootInput = {
  name: "root",
  level: 0,
  value: ".",
  subChildren: []
};

const child = {
  name: "child-1",
  level: 1,
  value: "",
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

const inputChangeHelper = (list, key, val) => {
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    if (child.name === key) {
      list[i].value = val;
    } else if (child.subChildren.length > 0 && key.includes(child.name)) {
      inputChangeHelper(child.subChildren, key, val);
    }
  }
  return list;
};

const App = () => {
  const [children, setChildren] = useState([rootInput, child]);

  const handleAddChild = newChild => {
    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
  };

  const handleReset = () => {
    rootInput["value"] = ".";
    rootInput["subChildren"] = [];
    child["value"] = "";
    child["subChildren"] = [];
    setChildren([rootInput, child]);
  };

  const handleInputChange = (e, key) => {
    const updatedChildren = inputChangeHelper(
      [...children],
      key,
      e.target.value
    );
    setChildren(updatedChildren);
  };

  const handleAddSubChild = curChild => {
    const subChildren = [...curChild.subChildren];
    const len = subChildren.length;
    const newSubChild = {
      name: `${curChild.name}-${len + 1}`,
      level: curChild.level + 1,
      value: "",
      subChildren: []
    };
    subChildren.push(newSubChild);
    const updatedChild = {
      ...curChild,
      subChildren: subChildren
    };

    const updatedChildren = findSubChild([...children], updatedChild);

    setChildren(updatedChildren);
  };
  return (
    <div className="App">
      <MainCard
        children={children}
        handleAddChild={handleAddChild}
        handleAddSubChild={handleAddSubChild}
        handleReset={handleReset}
        handleInputChange={handleInputChange}
      />
      <Result children={children} />
    </div>
  );
};

export default App;
