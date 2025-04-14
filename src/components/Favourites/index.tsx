import React from 'react'
import styles from './Favourites.module.css'
import RecipeCard from '../RecipeCard'
import { useSelector } from 'react-redux'

const index = () => {
  const favourites = useSelector((state) => state.favorites);

  return (
    <>
    <div className={styles.title}>Favourite recipes</div>
    <div className={styles.favouritesContainer}>
      {favourites.length > 0 ? (
        favourites.map((recipe) => (
          <RecipeCard key={recipe.id} recipeInfo={recipe}  />
        ))
      ) : (
        <p>No favourite recipes found.</p>
      )}
    </div>
    </>
  )
}

export default index