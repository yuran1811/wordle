import { BoardType } from '@shared/types/redux';
import { FC } from 'react';
import { Square } from './Square';

interface BoardProps {
  board: BoardType;
}

export const Board: FC<BoardProps> = ({ board }) => (
  <div className="m-6 grid grid-cols-[repeat(5,0fr)] justify-center">
    {board.map((_, idx) => (
      <Square squareIdx={idx} value={board[idx]} key={idx} />
    ))}
  </div>
);
