import { ReactNode } from "react";

import styles from "./styles.module.scss";

type BackgroundColorContainerPropsType = {
  children: ReactNode;
};

const BackgroundColorContainer = ({
  children,
}: BackgroundColorContainerPropsType) => {
  return <div className={styles.container}>{children}</div>;
};

export default BackgroundColorContainer;
