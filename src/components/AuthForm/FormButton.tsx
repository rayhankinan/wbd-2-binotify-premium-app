import React from "react";
import styles from "./FormButton.module.css";

const FormButton = ({
  text,
  onClickFunction,
  disabled
}: {
  text: string;
  onClickFunction: (e: React.SyntheticEvent) => void;
  disabled: boolean;
}) => {
  return (
    <button className={styles.formButton} type="submit" onClick={onClickFunction} disabled={disabled}>
      {text}
    </button>
  );
};

export default FormButton;
