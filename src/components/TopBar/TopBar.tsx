import React from "react";
import Clock from "./Clock";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./topBar.module.scss";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const navigate = useNavigate();
    
    const handleSettingsClick = () => {
        navigate("/settings");
    };

    return (
        <div className={styles.topBar}>
            <Clock />
            <FontAwesomeIcon 
                icon={faCog} 
                className={styles.settingsIcon} 
                onClick={handleSettingsClick}
            />
        </div>
    );
};

export default TopBar;