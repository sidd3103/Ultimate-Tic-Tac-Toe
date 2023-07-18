import { createContext, useContext, useState } from "react";
import { VscCircleLarge, VscClose } from "react-icons/vsc";
import { TiEquals } from "react-icons/ti";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [player, setPlayer] = useState(0);
  const [bigSquares, setBigSquares] = useState(Array(9).fill(-1));
  const [currentBoard, setCurrentBoard] = useState(4);
  const [completedBoards, setCompletedBoards] = useState([]);
  const [isFreeToChoose, setIsFreeToChoose] = useState(false);

  const validResults = ["X", "O", 0];

  const icons = {
    O: <VscCircleLarge />,
    X: <VscClose />,
    Draw: <TiEquals />,
  };

  const nextPlayer = () => setPlayer((player + 1) % 2);

  const handleClick = (setSquares, squares, i, board_idx) => {
    let result = calculateWinner(squares);

    if (
      validResults.includes(result) ||
      squares[i] !== -1 ||
      (!isFreeToChoose && board_idx !== currentBoard)
    ) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = !player ? "X" : "O";
    if (validResults.includes(calculateWinner(newSquares))) {
      setCompletedBoards((prev) => {
        const newCompletedBoards = [...prev, board_idx];
        setIsFreeToChoose(newCompletedBoards.includes(i));
        return newCompletedBoards;
      });
    } else {
      setIsFreeToChoose(completedBoards.includes(i));
    }
    setSquares(newSquares);
    setCurrentBoard(i);
    nextPlayer();
  };


  /*
  Returns 'X' if X won, 'O' if O won, 0 if draw, undefined if board is still active
  */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isFull = squares.filter((s) => s === -1).length === 0;

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] !== -1 &&
        squares[a] !== 0
      ) {
        return squares[a];
      }
    }

    return isFull ? 0 : undefined;
  };

  return (
    <GlobalContext.Provider
      value={{
        player,
        setPlayer,
        nextPlayer,
        handleClick,
        calculateWinner,
        bigSquares,
        setBigSquares,
        icons,
        currentBoard,
        completedBoards,
        setCompletedBoards,
        isFreeToChoose,
        setIsFreeToChoose,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
