import React from 'react'
import styles from './RecipeCard.module.css'

const index = ({recipeInfo}) => {
    console.log(recipeInfo)
    return (
        <div className={styles.recipeCard}>
            <img src={recipeInfo.image} alt="" />
            <h1>{recipeInfo.name}</h1>
        </div>
    )
}

export default index