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

const sortHelper = list => {
  list.sort((a, b) => {
    // Ignore .
    if (a.value.charAt(0) === "." && a.value.length > 1) {
      return a.value.substr(1).localeCompare(b.value);
    } else if (b.value.charAt(0) === "." && b.value.length > 1) {
      return a.value.localeCompare(b.value.substr(1));
    } else {
      return a.value.localeCompare(b.value);
    }
  });

  for (let i = 0; i < list.length; i++) {
    if (list[i].subChildren.length > 0) {
      sortHelper(list[i].subChildren);
    }
  }
  return list;
};

const App = () => {
  const [children, setChildren] = useState([rootInput, child]);
  const [childCount, setChildCount] = useState(1);
  const [fontType, setFontType] = useState(1);

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

  const handleFontType = () => {
    if (fontType === 1) {
      setFontType(2);
    } else {
      setFontType(1);
    }
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

  const handleSort = () => {
    const rootInput = children[0];
    const updated = sortHelper([...children].slice(1));
    updated.unshift(rootInput);
    setChildren(updated);
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
        handleSort={handleSort}
        childCount={childCount}
      />
      <Result
        children={children}
        fontType={fontType}
        handleFontType={handleFontType}
      />
    </div>
  );
};

export default App;
