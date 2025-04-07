import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Use full star and half star from the solid set, and empty star from the regular set.
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import styles from './StarRating.module.css'

const StarRating = ({ rating, ratingCount }) => {
    // Calculate full stars.
    const fullStars = Math.floor(rating);
    // Determine if a half star is needed.
    const hasHalfStar = rating - fullStars >= 0.5;
    // Calculate empty stars so that total stars equals 5.
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={`full-${i}`} icon={fullStar} className={styles.star}/>);
    }
    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key="half" icon={halfStar} className={styles.star}/>);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={emptyStar} className={styles.star}/>);
    }

    return (
        <div className={styles.rating}>
            {stars} ({ratingCount})
        </div>

    )
};

export default StarRating;
