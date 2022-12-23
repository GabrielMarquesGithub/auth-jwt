import { FormHTMLAttributes } from "react";

import styles from "./styles.module.scss";

//get default props
type FormPropsType = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...rest }: FormPropsType) => {
  return (
    <form className={styles.form} {...rest}>
      {children}
    </form>
  );
};

export default Form;
