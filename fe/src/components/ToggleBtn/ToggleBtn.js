import { useState } from "react";

import "./ToggleBtn.css";

function ToggleBtn() {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ToggleBtn;
