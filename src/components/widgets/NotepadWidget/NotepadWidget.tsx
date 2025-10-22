import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './notepadWidget.module.scss';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';

const NotepadWidget = () => {
    return (
        <button role="button" className={styles.notepadWidget} title='Notes' >
            <FontAwesomeIcon icon={faNoteSticky} className={styles.icon} />
        </button>
    )
}

export default NotepadWidget