import React, { useEffect, useState } from 'react'
// import Navbar from '../Navbar'
import RecipeCard from '../RecipeCard'
import styles from './Recipe.module.css'

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');

  const mealTypes = [
    { label: 'All', value: '' },
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
    { label: 'Beverage', value: 'beverage' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Side Dish', value: 'side dish' }
  ];
  
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

  const fetchFilteredRecipes = (mealType) => {
    const url = `https://dummyjson.com/recipes/meal-type/${encodeURIComponent(mealType)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes || []);
      })
      .catch((error) => console.error('Error fetching filtered recipes:', error));
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
    setSelectedMealType('');
    fetchRecipes('');
  };

  // Handler for meal type filter changes using radio buttons.
  const handleMealTypeChange = (e) => {
    const selected = e.target.value;
    console.log(selected)
    setSelectedMealType(selected);
    if (selected) {
      fetchFilteredRecipes(selected);
    } else {
      // When cleared, call fetchRecipes (optionally with the search query if that should persist)
      fetchRecipes(searchQuery);
    }
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

        <div className={styles.filterContainer}>
        {mealTypes.map((meal) => (
          <label key={meal.value} className={styles.filterLabel}>
            <input
              type="radio"
              name="mealType"
              value={meal.value}
              checked={selectedMealType === meal.value}
              onChange={handleMealTypeChange}
              className={styles.filterRadio}
            />
            {meal.label}
          </label>
        ))}
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