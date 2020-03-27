import React from "react";

import "./styles.scss";

const traverse = (list, resList, extraText, fontType) => {
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    if (list.length - 1 !== i) {
      resList.push(
        <pre
          key={child.name}
          className="result-text"
        >{`${extraText}├── ${child.value}`}</pre>
      );
    } else {
      resList.push(
        <pre
          key={child.name}
          className="result-text"
        >{`${extraText}└── ${child.value}`}</pre>
      );
    }
    if (child.subChildren.length > 0) {
      let text = "";
      if (child.level === 1) {
        text = extraText + "|   ";
      } else {
        text = extraText + "    ";
      }
      traverse(child.subChildren, resList, text, fontType);
    }
  }
  return resList;
};

const Result = ({ children, sortedAlphabetical, fontType }) => {
  const rootText = children[0].value;
  let newChildren = [...children];
  newChildren = newChildren.slice(1);

  const elements = traverse(newChildren, [], "", fontType);

  return (
    <div className="result">
      <pre className="result-text">{rootText}</pre>
      {elements}
    </div>
  );
};

export default Result;
