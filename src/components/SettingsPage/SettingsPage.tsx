import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons"; // Import faSave icon
import styles from "./SettingsPage.module.scss";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const navigate = useNavigate();

    const handleCrossClick = () => {
        navigate("/");
    };

    const handleSaveClick = () => {
        // Add your save logic here
        console.log("Settings saved!");
    };

    return (
        <div className={styles.settingsPage}>
            <div className={styles.header}>
                <h1>Settings</h1>
                <FontAwesomeIcon 
                    icon={faTimes} 
                    className={styles.crossIcon} 
                    onClick={handleCrossClick}
                />
            </div>
            {/* Add your settings content here */}
            <div className={styles.footer}>
                <button className={styles.saveButton} onClick={handleSaveClick}>
                    <FontAwesomeIcon icon={faSave} className={styles.saveIcon} />
                    Save
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;