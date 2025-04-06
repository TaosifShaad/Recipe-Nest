import React, { useEffect, useState } from 'react'
// import Navbar from '../Navbar'
import RecipeCard from '../RecipeCard'
import styles from './Recipe.module.css'

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/recipes', {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.recipes)
        setRecipes(data.recipes);
      })
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <>
      <div className={styles.container}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipeInfo={recipe} />
        ))}
      </div>
    </>
  )
}

export default Recipe