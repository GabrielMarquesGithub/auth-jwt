import styles from "./styles.module.scss";

type COMPONENT_NAMEPropsType = {};

const COMPONENT_NAME = ({}: COMPONENT_NAMEPropsType) => {
  return <div className={styles.container}>Hello World</div>;
};

export default COMPONENT_NAME;
