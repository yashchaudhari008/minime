import styles from "./footer.module.scss";
import GithubIcon from "./GithubIcon";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>
				Made with ♥ by{" "}
				<a target="_blank" href="https://github.com/yashchaudhari008">
					yashchaudhari008
				</a>{" "}
				&{" "}
				<a
					target="_blank"
					href="https://github.com/yashchaudhari008/minime/graphs/contributors"
				>
					contributors
				</a>
				<span className={styles.stick}> | </span>
				<a
					target="_blank"
					className={styles.github}
					href="https://github.com/yashchaudhari008/minime"
				>
					<GithubIcon /> Github Page
				</a>
			</p>
		</footer>
	);
};

export default Footer;
