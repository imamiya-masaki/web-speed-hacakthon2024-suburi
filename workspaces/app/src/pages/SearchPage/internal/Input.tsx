import './input.module.css';

type Props = JSX.IntrinsicElements['input'];

export const Input: React.FC<Props> = ({ ...rest }) => {
  return <input className='Input___Input__styled' {...rest} placeholder="作品名を入力" />;
};
