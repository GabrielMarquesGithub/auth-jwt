import { InputHTMLAttributes } from "react";

import styles from "./styles.module.scss";

//get default props
type InputPropsType = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: InputPropsType) => {
  return <input className={styles.input} {...rest} />;
};

export default Input;
