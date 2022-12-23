import { useContext } from "react";
import { MdOutlineSecurity } from "react-icons/md";

import styles from "./styles.module.scss";

import { AuthContext } from "../../../contexts/AuthContext";

import BackgroundColorContainer from "../../container/BackgroundColorContainer";
import CentralizedContainer from "../../container/CentralizedContainer";
import UserCard from "../../dataDisplay/UserCard";
import Button from "../../form/Button";

const Dashboard = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <CentralizedContainer>
      <section className={styles.user_container}>
        <BackgroundColorContainer>
          <div className={styles.user_container_header}>
            <h2>User Information</h2>
            <MdOutlineSecurity />
          </div>
          {user && <UserCard email={user.email} roles={user.roles} />}
          <Button onClick={signOut}>Desconectar</Button>
        </BackgroundColorContainer>
      </section>
    </CentralizedContainer>
  );
};

export default Dashboard;
