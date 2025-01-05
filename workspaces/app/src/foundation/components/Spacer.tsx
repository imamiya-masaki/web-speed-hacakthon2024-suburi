import React from 'react';
import { useBoolean, useMount } from 'react-use';

type Props = {
  height?: number;
  width?: number;
};

export const Spacer: React.FC<Props> = ({ height, width }) => {
  const [mounted, toggleMounted] = useBoolean(false);

  useMount(() => {
    toggleMounted();
  });

  return mounted ? <div style={{flexGrow: 0, flexShrink: 0, height: height !== undefined ? `${height}px` : '100%', width: width !== undefined ? `${width}px` : '100%'}} /> : null;
};
