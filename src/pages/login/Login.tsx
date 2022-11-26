import React, { useEffect, useState } from "react";

import styles from "./Login.module.css";
import Logo from "../../assets/logo-dark.svg";

import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import FormGroup from "../../components/AuthForm/FormGroup";
import FormButton from "../../components/AuthForm/FormButton";

import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    setIsUsernameValid(username.length > 0);
  }, [username]);

  useEffect(() => {
    setIsPasswordValid(password.length > 0);
  }, [password]);

  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // TODO: Send POST request to REST API
    alert("Login button clicked!");
  };

  return (
    <AuthWrapper>
      <>
        <header className={styles.header}>
          <img src={Logo} alt="Binotify Logo" />
          <p>Log in to start using Binotify Premium!</p>
        </header>
        <form className={styles.form}>
          <FormGroup
            id="username"
            type="text"
            label="Enter your username:"
            placeholder="johndoe"
            value={[username, setUsername]}
            status={isUsernameValid}
            errorText="Username cannot be empty!"
          />
          <FormGroup
            id="password"
            type="password"
            label="Enter your password:"
            placeholder=""
            value={[password, setPassword]}
            status={isPasswordValid}
            errorText="Password cannot be empty!"
          />
          <FormButton
            text="Login"
            onClickFunction={onLogin}
            disabled={!isUsernameValid || !isPasswordValid}
          />
        </form>
        <p>Don't have an account yet? <span className={styles.redirect}><Link to="/register">Register</Link></span>.</p>
      </>
    </AuthWrapper>
  );
};

export default Login;
