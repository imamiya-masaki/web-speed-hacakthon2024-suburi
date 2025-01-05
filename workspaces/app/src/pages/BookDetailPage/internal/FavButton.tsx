// FavButton.tsx

import React from 'react';

import { Color, Space } from '../../../foundation/styles/variables';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

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
          ? <Favorite style={{ color: Color.Favorite, height: 24, width: 24 }} /> 
          : <FavoriteBorder style={{ color: Color.MONO_40, height: 24, width: 24 }} />
      }
    </button>
  );
};
