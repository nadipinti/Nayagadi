import React from "react";
import styles from "../styles/_toolbar.module.scss";
const Backdrop = (props) => {
return (
    <div className={styles.backdrop} onClick = {props.click}></div>
)
}

export default Backdrop;