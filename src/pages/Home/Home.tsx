import TopBar from "../../components/TopBar/TopBar";
import WidgetHolder from "../../components/WidgetHolder/WidgetHolder";
import Footer from "../../components/Footer/Footer";
import styles from "./home.module.scss";

const Home = () => {
	return (
		<div className={styles.home}>
			<TopBar />
			<WidgetHolder />
			<Footer />
		</div>
	);
};

export default Home;
