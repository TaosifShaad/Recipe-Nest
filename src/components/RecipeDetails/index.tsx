import React, { useEffect, useState } from 'react'
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
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck';
import Loader from '../Loader';
import Navbar from '../Navbar';


const index = () => {
  // const location = useLocation();
  // const { recipe } = location.state || {};
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState({});
  const [loading, setLoading] = useState(false);



  const fetchRecipeById = () => {
    setLoading(true);
    const url = `https://dummyjson.com/recipes/${encodeURIComponent(id)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data || []);
        setLoading(false);
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
    <>
      <Navbar />
      {loading ?
        <div className={styles.loadingContainer}><Loader /></div> :
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <h1 className={styles.title}>{recipe.name}</h1>
            <div className={styles.foodImg}>
              <img src={recipe.image} alt="recipe image" />
            </div>
            <div className={styles.rating}>
              <StarRating rating={recipe.rating} ratingCount={recipe.reviewCount} />
              <hr></hr>
            </div>
            <div className={styles.smallDetails}>
              <div className={styles.cuisine}>
                <FontAwesomeIcon icon={faEarthAmericas} /> {recipe.cuisine}
              </div>
              <div className={styles.calories}>
                <div><FontAwesomeIcon icon={faBowlFood} /> {recipe.caloriesPerServing} calories </div>
              </div>
              <div className={styles.prepTime}>
                <FontAwesomeIcon icon={faClock} /> Preparation time: {recipe.prepTimeMinutes} min
              </div>
              <div className={styles.cookTime}>
                <FontAwesomeIcon icon={faClock} /> Cooking time: {recipe.cookTimeMinutes} min
              </div>
              <div className={styles.difficulty}>
                <FontAwesomeIcon icon={faFire} /> {recipe.difficulty} difficulty
              </div>
              <div className={styles.mealType}>
                <FontAwesomeIcon icon={faListCheck} /> Type: {recipe.mealType?.map((type, index) => (
                  <span key={index} style={{color: 'green'}}>| {type} |</span>
                ))}
              </div>
              <div className={styles.tags}>
                <FontAwesomeIcon icon={faTags} /> Tags: {recipe.tags?.map((tag, index) => (
                  <span key={index} style={{color: 'green'}}> | {tag} | </span>
                ))}
              </div>
              <div className={styles.servings}>
                <FontAwesomeIcon icon={faUsers} /> {recipe.servings}
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.ingredients}>
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className={styles.instructions}>
              <h2>Instructions</h2>
              <ul>
                {recipe.instructions && recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>}
    </>
  )
}

export default index
