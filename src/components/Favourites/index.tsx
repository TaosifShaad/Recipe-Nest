import React from 'react'
import styles from './Favourites.module.css'
import RecipeCard from '../RecipeCard'
import { useSelector } from 'react-redux'

const index = () => {
  const favourites = useSelector((state) => state.favorites);

  return (
    <>
      <div>Favourite recipes</div>
      {favourites.length > 0 ? (
        favourites.map((recipe) => (
          <RecipeCard key={recipe.id} recipeInfo={recipe} hideFavoritesFunctionalities={true} />
        ))
      ) : (
        <p>No favourite recipes found.</p>
      )}
    </>
  )
}

export default index