import { useState } from "react";
import {
  GameHistory,
  HistoryButtonProps,
  SquareButtonProps,
} from "./types/gameTypes";

const isGameStart = (data: GameHistory) => {
  return !data.move && data.currentMove === 0;
};

const winner = (squares: string[]) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [x, y, z] = winningLines[i];
    const first = squares[x];
    const second = squares[y];
    const third = squares[z];
    if (first && first === second && first === third) {
      return { player: first, winningLine: winningLines[i] };
    }
  }

  return null;
};

const SquareButton = ({
  value,
  handleClick,
  winner,
  location,
}: SquareButtonProps) => {
  const isWinner = winner && winner?.winningLine?.includes(location);

  return (
    <button
      className={`w-28 h-28 flex justify-center items-center border text-5xl font-bold ${
        isWinner ? "bg-green-400" : "hover:bg-slate-400"
      }`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

const HistoryButton = ({ data, handleClick, isActive }: HistoryButtonProps) => {
  const { currentMove } = data ?? {};
  return (
    <button
      onClick={handleClick}
      className={`w-36 p-1 rounded-lg ${
        isGameStart(data)
          ? "bg-red-400"
          : isActive
          ? "bg-green-400 "
          : "bg-slate-300 hover:bg-slate-400"
      }`}
    >
      {isGameStart(data) ? "Go To Game Start" : `Go To Move #${currentMove}`}
    </button>
  );
};

const BoardGame = () => {
  const initialHistory: GameHistory[] = [
    {
      move: "",
      location: 0,
      currentMove: 0,
      squares: Array(9).fill(null),
    },
  ];

  const [turn, setTurn] = useState<string>(() => "X");
  const [history, setHistory] = useState<GameHistory[]>(() => initialHistory);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState<number>(0);

  const handleSquareClick = (i: number) => {
    if (!squares[i]) {
      setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
      const nextSquares = squares.slice();
      nextSquares[i] = turn as unknown as string;
      setSquares(nextSquares);

      setHistory((prev) => {
        const newHistory = prev.slice(0, currentMove + 1);
        return [
          ...newHistory,
          {
            move: turn,
            location: i,
            currentMove: currentMove + 1,
            squares: nextSquares,
          },
        ];
      });

      setCurrentMove((prev) => prev + 1);
    }
  };

  const handleJumpTo = (move: number) => {
    setCurrentMove(move);
    setSquares(history[move].squares);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-6 max-sm:h-full max-sm:justify-between py-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold mb-5">
            {winner(squares)
              ? `Winner is ${winner(squares)?.player}`
              : ` Next Player is : ${String(turn)}`}
          </span>
          <div className=" w-fit grid grid-cols-3 grid-rows-3 ">
            {Array(9)
              .fill(null)
              .map((_, i) => (
                <SquareButton
                  value={squares[i]}
                  handleClick={() => handleSquareClick(i)}
                  winner={winner(squares)}
                  location={i}
                />
              ))}
          </div>
        </div>

        {/* history */}
        <div className="flex flex-col items-center gap-2">
          {history?.map((item: GameHistory) => (
            <HistoryButton
              data={item}
              handleClick={() => handleJumpTo(item.currentMove)}
              isActive={currentMove === item.currentMove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardGame;
