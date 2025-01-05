import './Input.module.css';

type Props = JSX.IntrinsicElements['input'];

export const Input: React.FC<Props> = ({ className, ...rest }) => {
  return <input className={`${className} Input___Input__styled`} {...rest} placeholder="作品名を入力" />;
};
