import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import styles from "./app.module.scss";

function App() {
	return (
		<>
			<div className={styles.app}>
				<TopBar />
				<WidgetHolder />
			</div>
		</>
	);
}

export default App;
