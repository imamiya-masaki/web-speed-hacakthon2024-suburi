// Text.tsx

import type * as CSS from 'csstype';
import React from 'react';

import type { Color, Typography } from '../styles/variables';

/**
 * 数値に 'px' を追加し、文字列の場合はそのまま返す関数
 * @param value - 数値または文字列
 * @returns 'px' が追加された文字列、または元の文字列
 */


type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  color: Color;
  flexGrow?: CSS.Property.FlexGrow;
  flexShrink?: CSS.Property.FlexShrink;
  id?: string;
  typography: Typography;
  weight?: 'bold' | 'normal';
} & Omit<JSX.IntrinsicElements['span'], 'style' | 'as'>; // 他の属性を必要に応じて追加

export const Text: React.FC<Props> = ({
  as = 'span',
  children,
  color,
  flexGrow,
  flexShrink,
  id,
  typography,
  weight = 'normal',
  ...rest
}) => {
  // スタイルオブジェクトの構築
  const style = {
    color,
    flexGrow,
    flexShrink,
    fontWeight: weight,
    ...parseTypography(typography),
  } satisfies React.CSSProperties;

  const setStyle: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(style)) {
    if (value !== undefined) {
      setStyle[key] = value;
    }
  }

  return (
    <span
      style={setStyle}
      id={id}
      {...rest}
    >
      {children}
    </span>
  );
};

/**
 * Typography の文字列を React の style オブジェクトに変換する関数
 * 例: "font-size: 16px; line-height: 1.5;" を { fontSize: '16px', lineHeight: 1.5 } に変換
 * @param typography - Typography の文字列
 * @returns React.CSSProperties オブジェクト
 */
const parseTypography = (typography: string): React.CSSProperties => {
  const styles: Record<string, string | number> = {};
  const rules = typography.split(';').filter(rule => rule.trim() !== '');

  rules.forEach(rule => {
    const [key, value] = rule.split(':').map(part => part.trim());
    if (key && value) {
      // CSS プロパティ名を camelCase に変換
      const camelKey = key.replace(/-([a-z])/g, (_, p1) => String(p1).toUpperCase());
      // 数値として解釈できる場合は数値型に変換
      const numericValue = Number(value);
      styles[camelKey] = isNaN(numericValue) ? value : numericValue;
    }
  });

  return styles;
};
