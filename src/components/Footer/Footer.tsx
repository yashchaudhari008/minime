import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>
				Made with <FontAwesomeIcon icon={faHeart} /> by&nbsp;
				<a target="_blank" href="https://github.com/yashchaudhari008">
					yashchaudhari008&nbsp;
				</a>
				&&nbsp;
				<a
					target="_blank"
					href="https://github.com/yashchaudhari008/minime/graphs/contributors"
				>
					contributors
				</a>
				<span> | </span>
				<a
					target="_blank"
					className={styles.github}
					href="https://github.com/yashchaudhari008/minime"
				>
					<FontAwesomeIcon className={styles.icon} icon={faGithub} />
					Github Page
				</a>
			</p>
		</footer>
	);
};

export default Footer;
