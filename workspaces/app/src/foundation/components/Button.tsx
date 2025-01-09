import './Button.module.css'

type Props = {
  children: React.ReactNode;
} & JSX.IntrinsicElements['button'];

export const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  const classname = `${className} Button___Button__styled`;
  return <button className={classname} {...rest}>{children}</button>;
};
