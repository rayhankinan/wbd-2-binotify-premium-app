import React, { useEffect, useState } from "react";

import styles from "./Login.module.css";
import Logo from "../../assets/logo-dark.svg";

import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import FormGroup from "../../components/AuthForm/FormGroup";
import FormButton from "../../components/AuthForm/FormButton";

import { REST_BASE_URL } from "../../constants/constants";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsUsernameValid(username.length > 0);
  }, [username]);

  useEffect(() => {
    setIsPasswordValid(password.length > 0);
  }, [password]);

  const onLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Build JSON data to be sent
    const requestBody = {
      username,
      password,
    };

    // Send POST request
    const response = await fetch(`${REST_BASE_URL}/user/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      localStorage.setItem("token", `Bearer ${data.token}`);
      navigate("/");
    }
  };

  return (
    <AuthWrapper>
      <>
        <ToastContainer />
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
        <p>
          Don't have an account yet?{" "}
          <span className={styles.redirect}>
            <Link to="/register">Register</Link>
          </span>
          .
        </p>
      </>
    </AuthWrapper>
  );
};

export default Login;
