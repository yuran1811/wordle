import type { FC } from 'react';

import type { BoardType } from '@shared/types/redux';
import { Square } from './Square';

interface BoardProps {
  board: BoardType;
}

export const Board: FC<BoardProps> = ({ board }) => (
  <div className="m-2 grid grid-cols-[repeat(5,0fr)] justify-center">
    {board.map((_, idx) => (
      <Square key={idx} squareIdx={idx} value={_} />
    ))}
  </div>
);
