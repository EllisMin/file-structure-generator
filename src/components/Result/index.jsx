import React from "react";

import "./styles.scss";

const traverse = (list, resList, sortedAlphabetical, extraText, fontType) => {
  if (sortedAlphabetical) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
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
      traverse(child.subChildren, resList, sortedAlphabetical, text);
    }
  }
  return resList;
};

const Result = ({ children, sortedAlphabetical, fontType }) => {
  const rootText = children[0].value;

  const elements = traverse(
    children.slice(1),
    [],
    sortedAlphabetical,
    "",
    fontType
  );

  return (
    <div className="result">
      <pre className="result-text">{rootText}</pre>
      {elements}
    </div>
  );
};

export default Result;
