import React from "react";
import styles from "./FormButton.module.css";

const FormButton = ({
  text,
  onClickFunction,
}: {
  text: string;
  onClickFunction: (e: React.SyntheticEvent) => void;
}) => {
  return (
    <button className={styles.formButton} type="submit" onClick={onClickFunction}>
      {text}
    </button>
  );
};

export default FormButton;
