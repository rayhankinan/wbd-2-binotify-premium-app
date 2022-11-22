import { useState, useEffect } from 'react';
import styles from './FormGroup.module.css';

const FormGroup = ({ id, type, label, placeholder, validationFunction, errorText } : { id: string, type: string, label: string, placeholder: string, validationFunction: (input: string) => boolean, errorText: string}) => {
    const [input, setInput] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);

    useEffect(() => {
        setIsValid(validationFunction(input));
    }, [input]);

    return <div className={styles.formGroup}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} value={input} onChange={e => {
            setInput(e.currentTarget.value)
        }} />
        {!isValid && <p className={styles.validation}>{errorText}</p>}
    </div>
};

export default FormGroup;