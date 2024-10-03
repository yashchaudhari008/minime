import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder"; 
import Footer from "./components/Footer/Footer";
import styles from "./app.module.scss";

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
