import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import Footer from "./components/Footer/Footer";
import styles from "./app.module.scss";
import { isBrowser } from "react-device-detect";

function App() {
	return (
		<>
			<div className={isBrowser ? styles.app : styles.mobileApp}>
				{isBrowser && <TopBar />}
				<WidgetHolder />
				<Footer />
			</div>
		</>
	);
}

export default App;
