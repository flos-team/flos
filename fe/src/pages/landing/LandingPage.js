import styles from "./LandingPage.module.css";
import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className={styles.landingRoot}> 
            Landing Page
            <Link to = "/home">
                <div>home</div>
            </Link>
            <Link to = "/login">
                <div>login</div>
            </Link>
        </div>
    );
}

export default Landing;