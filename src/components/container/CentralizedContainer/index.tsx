import { ReactNode } from "react";

import styles from "./styles.module.scss";

type CentralizedContainerPropsType = {
  children: ReactNode;
};

const CentralizedContainer = ({ children }: CentralizedContainerPropsType) => {
  return <div className={styles.container}>{children}</div>;
};

export default CentralizedContainer;
