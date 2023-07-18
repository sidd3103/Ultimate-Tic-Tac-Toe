import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { useGlobalContext } from "../context";

const Bigger_Board = () => {
  const { bigSquares, calculateWinner } = useGlobalContext();
  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    let result = calculateWinner(bigSquares);
    if (result) {
      setStatus(result === 0 ? "Draw" : result);
    }
  }, [bigSquares]);

  return (
    <>
      {status ? (
        <h1>{status}</h1>
      ) : (
        <div className="bigger-board">
          {[...Array(9).keys()].map((i) => {
            return <Board key={i} index={i} />;
          })}
        </div>
      )}
    </>
  );
};

export default Bigger_Board;
