import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Square = ({ val, handleClick, idx }) => {
  const { icons } = useGlobalContext();
  const verticalClass = {
    0: "top",
    1: "middle",
    2: "bottom",
  };

  const horizontalClass = {
    0: "left",
    1: "center",
    2: "right",
  };

  return (
    <button
      className={`square ${verticalClass[Math.floor(idx / 3)]} ${
        horizontalClass[idx % 3]
      }`}
      onClick={handleClick}
    >
      {val === -1 ? "" : icons[val]}
    </button>
  );
};

export default Square;
