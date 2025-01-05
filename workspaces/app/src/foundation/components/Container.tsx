import React from 'react';
import './Container.module.css'

type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => {
  return <div className='Container___Container__styled'>{children}</div>;
};
