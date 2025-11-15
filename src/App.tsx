import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import Footer from "./components/Footer/Footer";
import styles from "./app.module.scss";
import Search from "./components/Search/Search";
import Divider from "./components/shared/Divider/Divider";

function App() {
	return (
		<>
			<div className={styles.app}>
				<header className={styles.header}>
					<TopBar />
					<Search />
				</header>
				<Divider />
				<WidgetHolder />
				<Footer />
			</div>
		</>
	);
}

export default App;
