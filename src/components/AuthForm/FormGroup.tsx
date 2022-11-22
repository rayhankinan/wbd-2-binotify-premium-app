import { useState, useEffect } from 'react';
import styles from './FormGroup.module.css';

const FormGroup = ({ id, type, label, placeholder, value, status, errorText } : { id: string, type: string, label: string, placeholder: string, value: (string | React.Dispatch<React.SetStateAction<string>>)[], status: boolean, errorText: string}) => {
    return <div className={styles.formGroup}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} value={value[0] as string} onChange={e => {
            (value[1] as React.Dispatch<React.SetStateAction<string>>)(e.currentTarget.value)
        }} />
        {!status && <p className={styles.validation}>{errorText}</p>}
    </div>
};

export default FormGroup;