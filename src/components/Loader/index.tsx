import React from 'react'
import styles from './Loader.module.css'

const index = () => {
    return (
        <div className={styles.loaderContainer}>
            <span className={styles.loader}></span>
        </div>
    )
}

export default index