import styles from "./LandingPage.module.css";
import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className={styles.FooterNavBar}> 
            Landing Page
            <Link to = "/home">
                <div>22</div>
            </Link>
        </div>
    );
}

export default Landing;