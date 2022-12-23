import { FormEvent, useContext, useState } from "react";
import Router from "next/router";
import { MdOutlineSecurity } from "react-icons/md";

import styles from "./styles.module.scss";

import { AuthContext } from "../../../contexts/AuthContext";

import Input from "../../form/Input";
import BackgroundColorContainer from "../../container/BackgroundColorContainer";
import CentralizedContainer from "../../container/CentralizedContainer";
import Button from "../../form/Button";
import Form from "../../form/Form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(false);

    const data = {
      email,
      password,
    };

    //isAuthenticated está sendo retornado para evitar a utilização do state antigo
    const isAuthenticated = await signIn(data);

    //tratamento de erro
    if (!isAuthenticated) return setError(true);

    //se estiver correto dará push para a pagina desejada
    Router.push("/dashboard");
  };

  return (
    <CentralizedContainer>
      <section className={styles.form_container}>
        <BackgroundColorContainer>
          <div className={styles.form_container_header}>
            <h2>Authentication</h2>
            <MdOutlineSecurity />
          </div>
          <div className={styles.form_container_error_message}>
            {error && <span>Erro ao se autenticar</span>}
          </div>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Conectar-se</Button>
          </Form>
        </BackgroundColorContainer>
      </section>
    </CentralizedContainer>
  );
};

export default Login;
