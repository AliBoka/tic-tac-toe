import React from "react";
export type GameHistory = {
  move: string;
  location: number;
  currentMove: number;
  squares: string[];
};

export type SquareButtonProps = {
  value: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  winner: { player: string; winningLine: number[] } | null;
  location: number;
};

export type HistoryButtonProps = {
  data: GameHistory;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
};
