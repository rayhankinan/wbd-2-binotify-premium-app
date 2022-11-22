import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import FormGroup from "../../components/AuthForm/FormGroup";
import styles from "./Register.module.css";
import Logo from "../../assets/logo-dark.svg"

import { validateUsername } from "../../utils/validateUsername";
import { validateEmail } from "../../utils/validateEmail";

const Register = () => {
    return (
        <AuthWrapper>
            <>
                <header className={styles.header}>
                    <img src={Logo} alt="Binotify Logo" />
                    <p>Sign up for free to start using Binotify Premium!</p>
                </header>
                <form className={styles.form}>
                    <FormGroup id="username" type="text" label="Enter your username:" placeholder="johndoe" validationFunction={validateUsername} errorText="Username can only be alphanumeric characters + underscore!" />
                    <FormGroup id="email" type="email" label="Enter your email:" placeholder="john@doe.com" validationFunction={validateEmail} errorText="Invalid email format!" />
                    <FormGroup id="password" type="password" label="Enter your password:" placeholder="" validationFunction={validateUsername} errorText="" />
                    <FormGroup id="confirm" type="password" label="Confirm your password:" placeholder="" validationFunction={validateUsername} errorText="" />
                </form>
            </>
        </AuthWrapper>
    )
}

export default Register;