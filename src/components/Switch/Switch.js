import React from "react";
import "./Switch.css";
import { useState } from "react";

const Switch = ({isToggled, onToggle }) => {
  // const [isToggled, setIsToggled] = useState(false);
  // const onToggle = () => setIsToggled(!isToggled);
  return (
    <>
      <label className="toggle-switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className="switch" />
      </label>
    </>
  );
};

export default Switch;
