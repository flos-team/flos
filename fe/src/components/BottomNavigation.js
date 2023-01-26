import styles from "./BottomNavigation.module.css";
import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
    return (
        <div className={styles.FooterDiv}>
            <div className={styles.FooterNavBar}>
                <Link to="/Post">
                    <div className={styles.Post}>
                        Post
                    </div>
                </Link>
                <Link to="/Global">
                    <div className={styles.Global}>
                        Global
                    </div>
                </Link>
                <Link to="/Home">
                    <div className={styles.Home}>
                        home
                    </div>
                </Link>
                <Link to="/Garden">
                    <div className={styles.Garden}>
                        garden
                    </div>
                </Link>
                <Link to="/Profile">
                    <div className={styles.Profile}>
                        profile
                    </div>
                </Link>
            </div>
        </div>
    );
}