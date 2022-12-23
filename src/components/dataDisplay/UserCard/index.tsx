import styles from "./styles.module.scss";

type UserCardPropsType = {
  email: string;
  roles: string[];
};

const UserCard = ({ email, roles }: UserCardPropsType) => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <p>
            <strong>Email - </strong>
            {email}
          </p>
          <p>
            <strong>Roles - </strong>
            {roles.map((role, index) => (index === 0 ? role : ", " + role))}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default UserCard;
