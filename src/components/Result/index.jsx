import React from "react";
import Switch from "react-switch";
import "./styles.scss";

const traverse = (list, resList, extraText, fontType) => {
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    if (list.length - 1 !== i) {
      if (fontType === 1) {
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
          >{`${extraText}├─ ${child.value}`}</pre>
        );
      }
    } else {
      if (fontType === 1) {
        resList.push(
          <pre
            key={child.name}
            className="result-text"
          >{`${extraText}└── ${child.value}`}</pre>
        );
      } else {
        resList.push(
          <pre
            key={child.name}
            className="result-text"
          >{`${extraText}└─ ${child.value}`}</pre>
        );
      }
    }
    if (child.subChildren.length > 0) {
      let text = "";
      if (child.level === 1) {
        if (fontType === 1) {
          text = extraText + "|   ";
        } else {
          text = extraText + " |     ";
        }
      } else {
        if (fontType === 1) {
          text = extraText + "    ";
        } else {
          text = extraText + "        ";
        }
      }
      traverse(child.subChildren, resList, text, fontType);
    }
  }
  return resList;
};

const Result = ({ children, handleFontType, fontType }) => {
  const rootText = children[0].value;
  let newChildren = [...children];
  newChildren = newChildren.slice(1);
  const elements = traverse(newChildren, [], "", fontType);

  return (
    <div className={`${fontType === 1 ? "font-1" : "font-2"} result`}>
      <div className="font-type-container">
        <label>
          <span>Font Type</span>
          <Switch
            onChange={handleFontType}
            checked={fontType === 1 ? false : true}
            offColor="#ccc"
            onColor="#4a4a4a"
            onHandleColor="#eee"
            uncheckedIcon={false}
            checkedIcon={false}
            handleDiameter={21}
            height={23}
            width={40}
          />
        </label>
      </div>
      <pre className="result-text">{rootText}</pre>
      {elements}
    </div>
  );
};

export default Result;
