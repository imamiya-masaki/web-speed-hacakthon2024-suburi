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
  loading = 'eager',
  ...rest
}) => {
  // スタイルオブジェクトの構築
  const style: React.CSSProperties = {
    objectFit,
    width: addUnitIfNeeded(width),
    height: addUnitIfNeeded(height),
    display: 'block',
  };

  return (
    <img
      style={style}
      loading={loading}
      {...rest}
    />
  );
};
