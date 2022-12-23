import styles from "./styles.module.scss";

type UserCardPropsType = {
  email: string;
};

const UserCard = ({ email }: UserCardPropsType) => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <strong>Email - {email}</strong>
        </li>
      </ul>
    </div>
  );
};

export default UserCard;
