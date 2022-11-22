import styles from './AuthWrapper.module.css';

const AuthWrapper = ({ children } : {children: JSX.Element}) => {
    return <div className={styles.authWrapper}>
        {children}
    </div>
}

export default AuthWrapper;