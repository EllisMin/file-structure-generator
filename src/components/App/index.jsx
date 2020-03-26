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

const removeHelper = (list, childName) => {
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    if (child.name === childName) {
      list.splice(i, 1);
    }
    if (child.subChildren.length > 0 && childName.includes(child.name)) {
      removeHelper(child.subChildren, childName);
    }
  }
  return list;
};

const App = () => {
  const [children, setChildren] = useState([rootInput, child]);
  const [childCount, setChildCount] = useState(1);

  const handleAddChild = newChild => {
    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
    setChildCount(childCount + 1);
  };

  const handleReset = () => {
    rootInput["value"] = ".";
    rootInput["subChildren"] = [];
    child["value"] = "";
    child["subChildren"] = [];
    setChildCount(1);
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
    let max = 0;
    for (let i = 0; i < subChildren.length; i++) {
      const name = subChildren[i].name;
      const thChild = parseInt(name.charAt(name.length - 1));
      max = Math.max(max, thChild);
    }

    const newSubChild = {
      name: `${curChild.name}-${max + 1}`,
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

  const handleRemove = childName => {
    const updatedChildren = removeHelper([...children], childName);
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
        handleRemove={handleRemove}
        childCount={childCount}
      />
      <Result children={children} sortedAlphabetical />
    </div>
  );
};

export default App;
