import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './notepadWidget.module.scss';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';

const NotepadWidget = ({
    onClick: onClickHandler,
}: React.HTMLProps<HTMLButtonElement>) => {
    return (
        <button role="button" className={styles.notepadWidget} title='Notes' onClick={onClickHandler} >
            <FontAwesomeIcon icon={faNoteSticky} className={styles.icon} />
        </button>
    )
}

export default NotepadWidget