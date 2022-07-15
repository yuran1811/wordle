import { RootState } from '@shared/types/redux';
import { motion, Variants } from 'framer-motion';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

interface SquareProps {
  value: string;
  squareIdx: number;
}

const variants: Variants = {
  popup: {
    scale: [1.2, 1],
    transition: {
      duration: 0.2,
    },
  },
  normal: {
    scale: [1.2, 1],
    transition: {
      duration: 0.2,
    },
  },
};

export const Square: FC<SquareProps> = (props) => {
  const { value, squareIdx, ...otherProps } = props;

  const rowIndex = useSelector((s: RootState) => s.board.rowIndex);
  const todayWord = useSelector((s: RootState) => s.board.todayWord);

  const [status, setStatus] = useState('normal');

  const appearIdx = useMemo(() => todayWord.indexOf(value.toUpperCase()), [value]);

  const letterIdx = squareIdx % 5;

  useEffect(() => {
    if (!value || Math.floor(squareIdx / 5) >= rowIndex) {
      setStatus('normal');
      return;
    }

    if (todayWord[letterIdx] === value.toUpperCase()) setStatus('correct');
    else setStatus(appearIdx !== -1 ? 'present' : 'absent');

    return () => setStatus('normal');
  });

  return (
    <motion.div
      {...otherProps}
      variants={variants}
      animate={value ? 'popup' : 'normal'}
      className={`${
        ['correct', 'present', 'absent'].includes(status) ? ' animate-flip' : ''
      } flexcenter w-[5rem] h-[5rem] m-1 text-white border-slate-600 border-[3px]`}
      style={{
        animationDelay: `${letterIdx * 0.06}s`,
      }}
    >
      <div
        className={`${
          status === 'correct'
            ? 'bg-green-600'
            : status === 'present'
            ? 'bg-yellow-600'
            : status === 'absent'
            ? 'bg-slate-600'
            : 'bg-transparent'
        } w-full h-full p-2 text-center`}
        style={{
          transition: `background-color 0.5s ${0.3 + letterIdx * 0.06}s ease`,
        }}
      >
        {value.toUpperCase()}
      </div>
    </motion.div>
  );
};
