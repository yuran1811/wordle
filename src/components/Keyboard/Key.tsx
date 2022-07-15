import { FC, memo } from 'react';

interface KeyProps {
  label: string;
  setLetter: () => void;
}

export const Key: FC<KeyProps> = (props) => {
  const { label, setLetter, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className="cursor-pointer flexcenter w-[3.8rem] h-[3.8rem] p-2 m-1 bg-transparent text-white border-[2px] border-blue-300 rounded-[1rem]"
      onClick={setLetter}
    >
      <div className="text-center">{label.toUpperCase()}</div>
    </div>
  );
};

export default memo(Key);
