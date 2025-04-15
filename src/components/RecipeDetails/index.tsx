import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons/faEarthAmericas'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons/faBowlFood'
import StarRating from '../StarRating';


const index = () => {
  // const location = useLocation();
  // const { recipe } = location.state || {};
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState({});

  const fetchRecipeById = () => {
    const url = `https://dummyjson.com/recipes/${encodeURIComponent(id)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data || []);
      })
      .catch((error) => {
        // toast.error(error.message, {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: false,
        //   progress: undefined,
        //   theme: "colored",
        //   transition: Bounce,
        // });
      });
  };

  useEffect(() => {
    fetchRecipeById();
  }, []);

  return (
    <div>
      <div className={styles.leftContainer}>
        <h1>{recipe.name}</h1>
        <div className={styles.foodImg}>
          <img src={recipe.image} alt="recipe image" />
        </div>
        <div className={styles.rating}>
        <StarRating rating={recipe.rating} ratingCount={recipe.reviewCount} />
        <hr></hr>
          </div>
        <div className={styles.smallDetails}>
        <div className={styles.cuisine}>
        <FontAwesomeIcon style={{ marginLeft: '25px' }} icon={faEarthAmericas} /> {recipe.cuisine}
          </div>
          <div className={styles.calories}>
            <span> {recipe.caloriesPerServing} calories </span>
          </div>
          <div className={styles.prepTime}>
          <FontAwesomeIcon style={{ marginLeft: '25px' }} icon={faClock} /> {recipe.prepTimeMinutes} min
          </div>
          <div className={styles.cookTime}>
            <span> cooking time: {recipe.cookTimeMinutes} minutes </span>
          </div>
          <div className={styles.difficulty}>
          <FontAwesomeIcon style={{ marginLeft: '25px' }} icon={faFire} /> {recipe.difficulty}
          </div>
          <div className={styles.mealType}>
            <span> Type: {recipe.mealType} </span>
          </div>
          <div className={styles.tags}>
            <span> Tags: {recipe.tags} </span>
          </div>
          <div className={styles.servings}>
          <FontAwesomeIcon icon={faUsers} /> {recipe.servings}
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
