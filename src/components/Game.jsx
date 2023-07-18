import React from "react";
import { useGlobalContext } from "../context";
import { Board } from "./Board";
import Bigger_Board from "./Bigger_Board";

export const Game = () => {
  const { player, icons, currentBoard, isFreeToChoose } = useGlobalContext();

  let column = (currentBoard % 3) + 1;
  let row = Math.floor(currentBoard / 3) + 1;

  return (
    <div className="game">
      <h1>Ultimate Tic Tac Toe</h1>
      <Bigger_Board />
      <h2>
        {!player ? "X" : "O"} to play{" "}
        {isFreeToChoose ? "on any board" : `on board (${row}, ${column})`}
      </h2>
    </div>
  );
};
