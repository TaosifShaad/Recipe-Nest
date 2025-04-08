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

  // const fetchRecipes = (query) => {
  //   const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`;
  //   fetch(url, {
  //     method: "GET"
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRecipes(data.recipes || []);
  //     })
  //     .catch((error) => console.error('Error fetching recipes:', error));
  // };
  
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