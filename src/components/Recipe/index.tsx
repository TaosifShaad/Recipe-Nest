import React, { useEffect, useState } from 'react'
// import Navbar from '../Navbar'
import RecipeCard from '../RecipeCard'
import styles from './Recipe.module.css'

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')

  const fetchRecipes = (query) => {
    const url = query
      ? `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`
      : `https://dummyjson.com/recipes`;
    fetch(url, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes || []);
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  useEffect(() => {
    fetchRecipes('');
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchRecipes(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchRecipes('');
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <input type="text" name="search" placeholder="Search.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
          {searchQuery && (
          <button onClick={handleClearSearch}>
            Clear
          </button>
        )}
        </div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipeInfo={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </>
  )
}

export default Recipe