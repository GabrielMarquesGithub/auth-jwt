import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

//get default props
type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonPropsType) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
