// FavButton.tsx

import React from 'react';

import { Color, Space } from '../../../foundation/styles/variables';

type Props = {
  enabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & JSX.IntrinsicElements['button'];

export const FavButton: React.FC<Props> = ({ enabled, onClick, ...rest }) => {
  const style: React.CSSProperties = {
    borderRadius: '50%',
    backgroundColor: enabled ? Color.SubFavorite : Color.MONO_0,
    border: 'none',
    padding: `${Space}px`,
    width: '48px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return (
    <button
      style={style}
      aria-label={enabled ? 'お気に入りを解除する' : 'お気に入りに追加する'}
      onClick={onClick}
      {...rest}
    >
      {
        enabled 
          ? <svg height={24} width={24} fill={Color.Favorite} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FavoriteBorderIcon" ><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"></path></svg>
          : <svg height={24} width={24} fill={Color.MONO_40} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FavoriteIcon" ><path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path></svg>
      }
    </button>
  );
};
