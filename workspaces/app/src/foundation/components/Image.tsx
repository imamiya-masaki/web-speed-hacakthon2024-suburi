// Image.tsx

import React from 'react';
import type * as CSS from 'csstype';
import { addUnitIfNeeded } from '../../lib/css/addUnitIfNeeded';


type Props = {
  height: number | string;
  objectFit: CSS.Property.ObjectFit;
  width: number | string;
} & JSX.IntrinsicElements['img'];

export const Image: React.FC<Props> = ({
  height,
  objectFit,
  width,
  loading = 'lazy',
  ...rest
}) => {
  // スタイルオブジェクトの構築
  const style: React.CSSProperties = {
    objectFit,
    width: addUnitIfNeeded(width),
    height: addUnitIfNeeded(height),
    display: 'block',
  };

  const setStyle: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(style)) {
    if (value !== undefined) {
      setStyle[key] = value;
    }
  }

  return (
    <img
      style={setStyle}
      loading={loading}
      {...rest}
    />
  );
};
