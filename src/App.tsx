import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import Footer from "./components/Footer/Footer";
import styles from "./app.module.scss";
import Divider from "./components/shared/Divider/Divider";
import { useState } from "react";

function App() {
	const [searchValue, setSearchValue] = useState("");

	return (
		<>
			<div className={styles.app}>
				<header className={styles.header}>
					<TopBar searchValue={searchValue} setSearchValue={setSearchValue} />
				</header>
				<Divider />
				<WidgetHolder searchValue={searchValue} />
				<Footer />
			</div>
		</>
	);
}

export default App;
