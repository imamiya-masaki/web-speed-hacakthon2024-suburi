import type * as CSS from 'csstype';

import { addUnitIfNeeded } from '../../lib/css/addUnitIfNeeded';
import { CSSProperties, ReactNode } from 'react';

/**
 * _Flex コンポーネントは、柔軟なレイアウトを提供する div ラッパーです。
 * スタイルプロパティはすべてインラインスタイルとして適用されます。
 */
interface FlexProps {
  $align?: CSSProperties['alignItems'];
  $direction?: CSSProperties['flexDirection'];
  $flexGrow?: CSSProperties['flexGrow'];
  $flexShrink?: CSSProperties['flexShrink'];
  $gap?: number;
  $justify?: CSSProperties['justifyContent'];
  $p?: number;
  $pb?: number;
  $pl?: number;
  $position?: CSSProperties['position'];
  $pr?: number;
  $pt?: number;
  $px?: number;
  $py?: number;
  children: ReactNode;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const _Flex: React.FC<FlexProps> = ({
  $align,
  $direction,
  $flexGrow,
  $flexShrink,
  $gap = 0,
  $justify,
  $p,
  $pb,
  $pl,
  $position,
  $pr,
  $pt,
  $px,
  $py,
  children,
  style,
  as,
  className,
}) => {
  
  const flexStyle = {
    display: 'flex',
    alignItems: $align,
    flexDirection: $direction,
    flexGrow: $flexGrow,
    flexShrink: $flexShrink,
    gap: addUnitIfNeeded($gap),
    justifyContent: $justify,
    position: $position,
    padding: addUnitIfNeeded($p),
    paddingTop: addUnitIfNeeded($pt ?? $py),
    paddingBottom: addUnitIfNeeded($pb ?? $py),
    paddingLeft: addUnitIfNeeded($pl ?? $px),
    paddingRight: addUnitIfNeeded($pr ?? $px),
    ...style, // 外部からのスタイルを上書き可能にする
  } satisfies CSSProperties;

  const setStyle: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(flexStyle)) {
    if (value !== undefined) {
      setStyle[key] = value;
    }
  }

  const Component = as || 'div';

  return <Component className={className} style={setStyle}>{children}</Component>;
};

type Props = {
  align: CSS.Property.AlignItems;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  direction?: CSS.Property.FlexDirection;
  flexGrow?: CSS.Property.FlexGrow;
  flexShrink?: CSS.Property.FlexShrink;
  gap?: number;
  justify: CSS.Property.JustifyContent;
  p?: number;
  pb?: number;
  pl?: number;
  position?: CSS.Property.Position;
  pr?: number;
  pt?: number;
  px?: number;
  py?: number;
  className?: string;
};

export const Flex: React.FC<Props> = ({
  align,
  as,
  children,
  direction,
  flexGrow,
  flexShrink,
  gap,
  justify,
  p,
  pb,
  pl,
  position,
  pr,
  pt,
  px,
  py,
  className
}) => {
  return (
    <_Flex
      $align={align}
      $direction={direction}
      $flexGrow={flexGrow}
      $flexShrink={flexShrink}
      $gap={gap}
      $justify={justify}
      $p={p}
      $pb={pb}
      $pl={pl}
      $position={position}
      $pr={pr}
      $pt={pt}
      $px={px}
      $py={py}
      as={as}
      className={className}
    >
      {children}
    </_Flex>
  );
};
