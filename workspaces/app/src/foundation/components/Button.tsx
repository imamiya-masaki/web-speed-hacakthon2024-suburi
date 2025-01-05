import './Button.module.css'

type Props = {
  children: React.ReactNode;
} & JSX.IntrinsicElements['button'];

export const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  return <button className={`${className} Button___Button__styled`} {...rest}>{children}</button>;
};
