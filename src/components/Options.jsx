import React from "react";
import Checkbox from "@mui/material/Checkbox";

const Options = ({ label, isSelected, onSelect }) => {
  return (
    <div
      className="w-full flex items-center cursor-pointer p-2 "
      onClick={onSelect} // Clicking the whole option selects it
    >
      <Checkbox checked={isSelected} onChange={onSelect} />
      <span className="text-lg">{label}</span>
    </div>
  );
};

export default Options;
