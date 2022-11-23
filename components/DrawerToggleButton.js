import React from "react";
import styles from "../styles/_toolbar.module.scss";

const DrawerToggleButton = (props) => {
    
  return (
    <button className={styles.toggle_button} onClick = {props.click.drawerClickHandler}>
      <div className={styles.toggle_button__line}></div>
      <div className={styles.toggle_button__line}></div>
      <div className={styles.toggle_button__line}></div>
    </button>
  )
}

export default DrawerToggleButton;