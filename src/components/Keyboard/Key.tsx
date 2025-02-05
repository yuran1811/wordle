import { type FC, memo } from 'react';

interface KeyProps {
  label: string;
  setLetter: () => void;
}

export const Key: FC<KeyProps> = ({ label, setLetter, ...otherProps }) => (
  <div
    {...otherProps}
    className="flexcenter isAnimated m-1 size-10 cursor-pointer rounded-lg border-2 border-slate-500 bg-transparent p-2 text-white hover:scale-110"
    onClick={setLetter}
  >
    <div className="text-center text-xl">{label.toUpperCase()}</div>
  </div>
);

export default memo(Key);
