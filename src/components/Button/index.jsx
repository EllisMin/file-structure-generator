import React from "react";

import "./styles.scss";

const Button = ({ children, className, ...others }) => {
  return (
    <button className={`${className ? className : ""} btn-custom`} {...others}>
      {children}
    </button>
  );
};

export default Button;
