import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars, faTimes, faQrcode, faLink, faStream, faCalendarWeek,
    faQuestionCircle, faSlidersH, faPhoneVolume, faComments
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';


const index = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <div className={styles.navcontainer}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Link to={'/'}>Recipe Nest</Link>
                </div>

                {/* Navigation menu (same markup for both desktop and mobile) */}
                <nav className={`${styles.nav} ${isOpen ? styles.active : ''}`}>
                    <ul className={styles.menu}>
                        <li>
                            <Link to={"/favourites"}>
                                <FontAwesomeIcon icon={faQrcode} /> Favourites
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faStream} /> Overview
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faQuestionCircle} /> About
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faPhoneVolume} /> Contact
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Hamburger button: visible only on mobile */}
                <button className={styles.hamburger} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </header>
        </div>
    );

};

export default index