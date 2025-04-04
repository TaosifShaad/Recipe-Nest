import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars, faTimes, faQrcode, faLink, faStream, faCalendarWeek,
    faQuestionCircle, faSlidersH, faPhoneVolume, faComments
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Navbar.module.css'


const index = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={styles.navcontainer}>
            {/* Hamburger button (visible on mobile only) */}
            <div className={styles.hamburger}>
                {!isOpen && (
                    <button className={styles.button} onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                )}
            </div>

            {/* Sidebar */}
            <div className={`${styles.side_bar} ${isOpen ? styles.active : ''}`}>
                <div className={styles.title}>
                    <div className={styles.logo}>CodingLab</div>
                    <button className={styles.button} onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <ul className={styles.menu}>
                    <li>
                        <a href="#">
                            <FontAwesomeIcon icon={faQrcode} /> Dashboard
                        </a>
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
            </div>
        </div>
    );
};

export default index