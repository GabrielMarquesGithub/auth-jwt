import { MdOutlineSecurity } from "react-icons/md";

import styles from "./styles.module.scss";

import BackgroundColorContainer from "../../container/BackgroundColorContainer";
import CentralizedContainer from "../../container/CentralizedContainer";
import UserCard from "../../dataDisplay/UserCard";

const Dashboard = () => {
  return (
    <CentralizedContainer>
      <section className={styles.user_container}>
        <BackgroundColorContainer>
          <div className={styles.user_container_header}>
            <h2>User Information</h2>
            <MdOutlineSecurity />
          </div>
          <UserCard email={"email"} />
        </BackgroundColorContainer>
      </section>
    </CentralizedContainer>
  );
};

export default Dashboard;
