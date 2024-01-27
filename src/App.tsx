import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import styles from "./app.module.scss";
import Footer from "./components/Footer/Footer";

function App() {
	return (
		<>
			<div className={styles.app}>
				<TopBar />
				<WidgetHolder />
				<Footer />
			</div>
		</>
	);
}

export default App;
