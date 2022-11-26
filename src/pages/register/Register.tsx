import React, { useEffect, useState } from "react";

import styles from "./Register.module.css";
import Logo from "../../assets/logo-dark.svg";

import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import FormGroup from "../../components/AuthForm/FormGroup";
import FormButton from "../../components/AuthForm/FormButton";

import { validateUsername } from "../../utils/validateUsername";
import { validateEmail } from "../../utils/validateEmail";

import { REST_BASE_URL } from "../../constants/constants";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");

  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isConfirmationValid, setIsConfirmationValid] =
    useState<boolean>(false);

  useEffect(() => {
    setIsNameValid(name.length > 0);
  }, [username]);

  useEffect(() => {
    setIsUsernameValid(validateUsername(username));
  }, [username]);

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(password.length > 0);
    setIsConfirmationValid(password === confirmation);
  }, [password, confirmation]);

  const onRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Build JSON data to be sent
    const requestBody = {
      name,
      username,
      email,
      password,
    };

    // Send POST request
    const response = await fetch(`${REST_BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
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
      // TODO: Save authorization bearer in local storage and login user
    }
  };

  return (
    <AuthWrapper>
      <>
        <ToastContainer />
        <header className={styles.header}>
          <img src={Logo} alt="Binotify Logo" />
          <p>Sign up for free to start using Binotify Premium!</p>
        </header>
        <form className={styles.form}>
          <FormGroup
            id="name"
            type="text"
            label="Enter your name:"
            placeholder="johndoe"
            value={[name, setName]}
            status={isNameValid}
            errorText="Name cannot be empty!"
          />
          <FormGroup
            id="username"
            type="text"
            label="Enter your username:"
            placeholder="johndoe"
            value={[username, setUsername]}
            status={isUsernameValid}
            errorText="Username can only be alphanumeric characters + underscore!"
          />
          <FormGroup
            id="email"
            type="email"
            label="Enter your email:"
            placeholder="john@doe.com"
            value={[email, setEmail]}
            status={isEmailValid}
            errorText="Invalid email format!"
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
          <FormGroup
            id="confirm"
            type="password"
            label="Confirm your password:"
            placeholder=""
            value={[confirmation, setConfirmation]}
            status={isConfirmationValid}
            errorText="Confirmation password is different than password!"
          />
          <FormButton
            text="Register"
            onClickFunction={onRegister}
            disabled={
              !isUsernameValid ||
              !isConfirmationValid ||
              !isPasswordValid ||
              !isConfirmationValid
            }
          />
        </form>
      </>
    </AuthWrapper>
  );
};

export default Register;
