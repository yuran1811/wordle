import clsx from 'clsx';
import { motion, type Variants } from 'motion/react';
import { type FC, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

interface SquareProps {
  value: string;
  squareIdx: number;
}

const variants: Variants = {
  popup: () => ({
    scale: [1.2, 1.05],
    transition: {
      duration: 0.2,
    },
  }),
  normal: () => ({
    scale: [1.2, 1],
    transition: {
      duration: 0.2,
    },
  }),
};

export const Square: FC<SquareProps> = (props) => {
  const { value, squareIdx, ...otherProps } = props;

  const { rowIndex, todayWord, isEnd } = useAppSelector((s) => s.board);

  const [status, setStatus] = useState('normal');

  const appearIdx = useMemo(
    () => todayWord.indexOf(value.toUpperCase()),
    [value],
  );

  const letterIdx = squareIdx % 5;

  useEffect(() => {
    if (!value) {
      setStatus('normal');
      return;
    }

    if (!isEnd && Math.floor(squareIdx / 5) >= rowIndex) {
      setStatus('normal');
      return;
    }

    console.log('[useEffect] isEnd:', isEnd);

    if (todayWord[letterIdx] === value.toUpperCase()) setStatus('correct');
    else setStatus(appearIdx !== -1 ? 'present' : 'absent');

    return () => setStatus('normal');
  }, [rowIndex, todayWord, isEnd]);

  return (
    <motion.div
      {...otherProps}
      variants={variants}
      animate={value.length ? 'popup' : 'normal'}
      className={clsx(
        ['correct', 'present', 'absent'].includes(status) && 'animate-flip',
        'flexcenter m-1 size-12 border-2 border-slate-600 text-white',
      )}
      style={{ animationDelay: `${letterIdx * 0.06}s` }}
    >
      <div
        className={clsx(
          'flexcenter h-full w-full',
          `${
            status === 'correct'
              ? 'bg-green-600'
              : status === 'present'
                ? 'bg-yellow-600'
                : status === 'absent'
                  ? 'bg-slate-600'
                  : 'bg-transparent'
          }`,
        )}
        style={{
          transition: `background-color 0.5s ${letterIdx * 0.06}s ease`,
        }}
      >
        <span className="text-xl font-semibold">{value.toUpperCase()}</span>
      </div>
    </motion.div>
  );
};
