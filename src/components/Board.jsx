import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useGlobalContext } from "../context";

export const Board = ({ index }) => {
  const {
    handleClick,
    calculateWinner,
    bigSquares,
    setBigSquares,
    icons,
    currentBoard,
    completedBoards,
    setCompletedBoards
  } = useGlobalContext();
  const [squares, setSquares] = useState(Array(9).fill(-1));
  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    const update = () => {
      let result = calculateWinner(squares);
      if (result) {
        setStatus(result === 0 ? "Draw" : result);
        const newBigSquares = [...bigSquares];
        newBigSquares[index] = result;
        setBigSquares(newBigSquares);
      }
    };
    update();
  }, [squares]);

  return (
    <>
      <div
        className={
          status
            ? "board-winner"
            : `board${currentBoard === index ? " current" : ""}`
        }
      >
        {status
          ? icons[status]
          : [...Array(9).keys()].map((i) => {
              return (
                <Square
                  key={i}
                  handleClick={() => handleClick(setSquares, squares, i, index)}
                  val={squares[i]}
                  idx={i}
                />
              );
            })}
      </div>
    </>
  );
};
