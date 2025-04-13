import React from 'react'
import styles from './RecipeCard.module.css'
import StarRating from '../StarRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons/faEarthAmericas'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons/faBowlFood'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../../redux/FavouritesSlice'

const index = ({ recipeInfo, hideFavoritesFunctionalities = false }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const isFavorite = favorites.some((recipe) => recipe.id === recipeInfo.id);

    const handleFavoriteToggle = (() => {
        if (isFavorite) {
            dispatch(removeFavorite(recipeInfo.id));
        } else {
            dispatch(addFavorite(recipeInfo));
        }
    });

    return (
        <div className={styles.recipeCard}>
            <img src={recipeInfo.image} alt="" />
            <div className={styles.container}>
                {recipeInfo.mealType.map((type) => (
                    <span key={recipeInfo.key} style={{ color: 'red' }}>
                        | {type} |
                    </span>
                ))}
                <h1>{recipeInfo.name}</h1>
                <StarRating rating={recipeInfo.rating} ratingCount={recipeInfo.reviewCount} />
                <hr></hr>
                <div className={styles.info}>
                    <FontAwesomeIcon icon={faUsers} /> {recipeInfo.servings}
                    <FontAwesomeIcon style={{ marginLeft: '25px' }} icon={faClock} /> {recipeInfo.prepTimeMinutes} min
                    <FontAwesomeIcon style={{ marginLeft: '25px' }} icon={faFire} /> {recipeInfo.difficulty}
                    <FontAwesomeIcon style={{ marginLeft: '25px' }} icon={faEarthAmericas} /> {recipeInfo.cuisine}
                </div>
                {recipeInfo.ingredients.slice(0, 3).map((ingredient) => (
                    <ul>
                        <li key={recipeInfo.key}>
                            {ingredient}
                        </li>
                    </ul>
                ))}
                <ul><li>and more.....</li></ul>
                <div className={styles.cardFooter}>
                    <div style={{ marginTop: '34px' }}><FontAwesomeIcon icon={faBowlFood} /> {recipeInfo.caloriesPerServing} calories </div>
                    <Link to={`/recipe/${recipeInfo.id}`}>
                        <button className={styles.recipeBtn}>View recipe</button>
                    </Link>
                </div>
            </div>
            {!hideFavoritesFunctionalities && (
                <div className={styles.favouriteIcon} onClick={handleFavoriteToggle}>
                    <FontAwesomeIcon icon={faHeart} color={isFavorite ? 'magenta' : 'white'} />
                </div>
            )}
        </div>
    )
}

export default index