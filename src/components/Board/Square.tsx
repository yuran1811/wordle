import { FC } from 'react';
import { motion } from 'framer-motion';

interface SquareProps {
  value: string;
}

const variants = {
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
  const { value, ...otherProps } = props;

  return (
    <motion.div
      {...otherProps}
      variants={variants}
      animate={value ? 'popup' : 'normal'}
      className="flexcenter w-[5rem] h-[5rem] p-2 m-1 text-white border-slate-600 border-[3px]"
    >
      <div className="w-full h-full text-center">{value}</div>
    </motion.div>
  );
};
