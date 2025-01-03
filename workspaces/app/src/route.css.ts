import { style } from '@vanilla-extract/css';
import { Space } from './foundation/styles/variables';


export const _BackToTopButtonStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: `${Space * 1}px`,
  border: 'none',
  backgroundColor: 'transparent',
})