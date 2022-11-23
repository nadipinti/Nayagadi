import React from 'react'
import styles from "../styles/_toolbar.module.scss";
const sideDrawer = (props) => {
    let drawerClasses = [styles.side_drawer]
    if(props.show) {
        drawerClasses = [styles.side_drawer,styles.open].join(" ")
    }

    console.log(drawerClasses)
  return (
    <nav style = {{height:"100%",
      backgroundColor: "white",
      boxShadow: "1px 0px 7px rgba(0 0 0.5)",
      position:"fixed",
      top:"0",
      left:"0",
      width:"70%",
      maxWidth:"400px",
      zIndex: "200",
      transform: props.show ? "translateX(0)": "translateX(-100%)",
      transition: "transform 0.3s ease-out"}}>
      <ul>
        <li>
          <a href="/">Products</a>
        </li>
        <li>
          <a href="/">Users</a>
        </li>
      </ul>
    </nav>
  )
}

export default sideDrawer
