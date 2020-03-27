import React, { useState, useRef } from "react";
import Switch from "react-switch";
import Button from "../Button";
import "./styles.scss";

const traverse = (list, resList, extraText, fontType) => {
  let lastChild = false;
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    lastChild = list.length - 1 === i;
    if (!lastChild) {
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
      if (lastChild) {
        if (fontType === 1) {
          text = extraText + "    ";
        } else {
          text = extraText + "        ";
        }
      } else {
        if (fontType === 1) {
          text = extraText + "|   ";
        } else {
          text = extraText + " |      ";
        }
      }
      traverse(child.subChildren, resList, text, fontType);
    }
  }
  return resList;
};

const Result = ({ children, handleFontType, fontType }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const textRef = useRef(null);
  const rootText = children[0].value;
  let newChildren = [...children];
  newChildren = newChildren.slice(1);
  const elements = traverse(newChildren, [], "", fontType);

  const copyToClipboard = e => {
    // IE
    if (document.selection) {
      const range = document.body.createTextRange();
      range.movetoElementText(textRef.current);
      range.select();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(textRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");

      window.getSelection().removeRange(range); // Unselect
    }
    setCopySuccess("Copied!");
  };

  return (
    <div className={`${fontType === 1 ? "font-1" : "font-2"} result`}>
      <div className="result-header">
        {/* Display copy btn if command exists */}
        {document.queryCommandSupported("copy") && (
          <div className="">
            <Button onClick={copyToClipboard}>Copy</Button>
            {copySuccess}
          </div>
        )}
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
      <div className="texts" ref={textRef}>
        <pre className="result-text">{rootText}</pre>
        {elements}
      </div>
    </div>
  );
};

export default Result;
