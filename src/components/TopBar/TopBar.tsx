import Clock from "./Clock"
import styles from "./topBar.module.scss"

const TopBar = () => {
  return (
    <div className={styles.topBar}><Clock /></div>
  )
}

export default TopBar