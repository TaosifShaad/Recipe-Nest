import React, { useEffect, useState } from 'react'
// import Navbar from '../Navbar'
import RecipeCard from '../RecipeCard'
import styles from './Recipe.module.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  // const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [tagOptions, setTagOptions] = useState([{ label: 'All', value: '' }]);


  const mealTypes = [
    { label: 'All', value: '' },
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
    { label: 'Beverage', value: 'beverage' },
    { label: 'Snacks', value: 'snacks' },
    { label: 'Side Dish', value: 'side dish' }
  ];

  useEffect(() => {
    fetch('https://dummyjson.com/recipes/tags')
      .then((res) => res.json())
      .then((data) => {
        // setTags(data);
        const options = [{ label: 'All', value: '' }];
        data.forEach((t) => {
          console.log(t)
          options.push({ label: t, value: t });
        });
        setTagOptions(options);
      })
      .catch((error) => console.error('Error fetching tags:', error));
  }, []);


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

  const fetchTagRecipes = (tag) => {
    const url = `https://dummyjson.com/recipes/tag/${encodeURIComponent(tag)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes || []);
      })
      .catch((error) =>
        console.error('Error fetching recipes for tag:', error)
      );
  };

  useEffect(() => {
    fetchRecipes('');
  }, []);

  const handleSearch = () => {
    clearFilters();
    if (searchQuery.trim() !== '') {
      fetchRecipes(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearFilters()
  };

  const clearFilters = (() => {
    setSelectedMealType('');
    setSelectedTag('');
    fetchRecipes('');
  });

  // Handler for meal type filter changes using radio buttons.
  const handleMealTypeChange = (e) => {
    const selected = e.target.value;
    setSelectedMealType(selected);
    if (selected) {
      setSelectedTag('');
      fetchFilteredRecipes(selected);
    } else {
      // When cleared, call fetchRecipes (optionally with the search query if that should persist)
      fetchRecipes(searchQuery);
    }
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    setSelectedTag(tag);
    if (tag) {
      setSelectedMealType('');
      fetchTagRecipes(tag);
    } else {
      // If the tag filter is cleared ("All"), fetch based on search if available or default.
      fetchRecipes(searchQuery);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input className={styles.searchInput} type="text" name="search" placeholder="Search.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button onClick={handleSearch} className={styles.searchButton}>
            <img className={styles.searchImg} src="src/assets/search.png" alt="search" />
          </button>
          {searchQuery && (
            <button className={`${styles.searchButton} ${styles.clrButton}`} onClick={handleClearSearch}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>

        <div className={styles.filterAndCard}>
          <div className={styles.filters}>
            <div className={styles.filterContainer}>
              <h4>Meal Types</h4>
              <hr />
              <div className={styles.filterOptions}>
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
            </div>

            <div className={styles.filterContainer}>
              <h4>Tags</h4>
              <hr />
              <div className={styles.filterOptions}>
                {tagOptions.map((option) => (
                  <label key={option.value} className={styles.filterLabel}>
                    <input
                      type="radio"
                      name="tagFilter"
                      value={option.value}
                      checked={selectedTag === option.value}
                      onChange={handleTagChange}
                      className={styles.filterRadio}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipeInfo={recipe} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Recipe
