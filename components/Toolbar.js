import React from 'react'

import styles from "../styles/_toolbar.module.scss";
import DrawerToggleButton from './Drawertogglebutton';

const Toolbar = (props) => {
    console.log(props);
    return (
  <header className={styles.toolbar}>
    <nav className={styles.toolbar__navigation}>
      <div className={styles.togglebar_togglebutton}>
        <DrawerToggleButton click = {props}/>
      </div>
      <div className={styles.toolbar__logo}>
        <a href="/">THE LOGO</a>
      </div>
      <div className={styles.spacer} />
      <div className={styles.toolbar_navigation_items}>
        <ul>
          <li>
            <a href="/">New Launches</a>
          </li>
          <li>
            <a href="/">News</a>
          </li>
          <li>
            <a href="/">Blogs</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
    )
    }

export default Toolbar