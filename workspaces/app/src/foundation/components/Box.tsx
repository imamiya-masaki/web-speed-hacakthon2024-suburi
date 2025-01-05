// Box.tsx

import React from 'react';
import type * as CSS from 'csstype';
import type { AriaAttributes } from 'react';
import { addUnitIfNeeded } from '../../lib/css/addUnitIfNeeded';
import type { Color, Radius } from '../styles/variables';

type Props = {
  ['aria-label']?: AriaAttributes['aria-label'];
  ['aria-labelledby']?: AriaAttributes['aria-labelledby'];
  as?: keyof JSX.IntrinsicElements;
  backgroundColor?: Color;
  bottom?: number;
  children: React.ReactNode;
  color?: Color;
  flexGrow?: CSS.Property.FlexGrow;
  flexShrink?: CSS.Property.FlexShrink;
  height?: number | string;
  left?: number;
  m?: number;
  maxHeight?: number | string;
  maxWidth?: number | string;
  mb?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mx?: number;
  my?: number;
  overflow?: CSS.Property.Overflow;
  overflowX?: CSS.Property.Overflow;
  overflowY?: CSS.Property.Overflow;
  p?: number;
  pb?: number;
  pl?: number;
  position?: CSS.Property.Position;
  pr?: number;
  pt?: number;
  px?: number;
  py?: number;
  radius?: Radius;
  right?: number;
  top?: number;
  width?: number | string;
};

export const Box: React.FC<Props> = ({
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledBy,
  as = 'div',
  backgroundColor,
  bottom,
  children,
  color,
  flexGrow,
  flexShrink,
  height,
  left,
  m,
  maxHeight,
  maxWidth,
  mb,
  ml,
  mr,
  mt,
  mx,
  my,
  overflow,
  overflowX,
  overflowY,
  p,
  pb,
  pl,
  position,
  pr,
  pt,
  px,
  py,
  radius,
  right,
  top,
  width,
}) => {
  // スタイルオブジェクトの構築
  const style = {
    backgroundColor,
    borderRadius: radius,
    bottom: addUnitIfNeeded(bottom),
    color,
    flexGrow,
    flexShrink,
    height: addUnitIfNeeded(height),
    left: addUnitIfNeeded(left),
    marginBottom: addUnitIfNeeded(my ?? mb),
    marginLeft: addUnitIfNeeded(mx ?? ml),
    marginRight: addUnitIfNeeded(mx ?? mr),
    marginTop: addUnitIfNeeded(my ?? mt),
    margin: addUnitIfNeeded(m),
    maxHeight: addUnitIfNeeded(maxHeight),
    maxWidth: addUnitIfNeeded(maxWidth),
    overflowX: (overflow as any) ?? overflowX,
    overflowY: (overflow as any) ?? overflowY,
    paddingBottom: addUnitIfNeeded(py ?? pb),
    paddingLeft: addUnitIfNeeded(px ?? pl),
    paddingRight: addUnitIfNeeded(px ?? pr),
    paddingTop: addUnitIfNeeded(py ?? pt),
    padding: addUnitIfNeeded(p),
    position,
    right: addUnitIfNeeded(right),
    top: addUnitIfNeeded(top),
    width: addUnitIfNeeded(width),
  } satisfies React.CSSProperties;

  const setStyle: Record<string, string> = {}
  for (const [key, value] of Object.entries(style)) {
    if (value) {
      setStyle[key] = value;
    }
  }
  
  return React.createElement(as, {
    style: setStyle,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  }, children);
};
