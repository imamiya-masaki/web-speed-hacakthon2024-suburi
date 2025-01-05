import React from 'react';

type Props = {
  height?: number;
  width?: number;
};

export const Spacer: React.FC<Props> = ({ height, width }) => {
  return <div style={{flexGrow: 0, flexShrink: 0, height: height !== undefined ? `${height}px` : '100%', width: width !== undefined ? `${width}px` : '100%'}} /> ;
};
