import React, { FC, PropsWithChildren } from 'react';

export const Heading: FC<PropsWithChildren> = ({ children }) => {
  return <div className="font-bold text-[4rem] text-center text-white p-4">{children}</div>;
};
