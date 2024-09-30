import TopBar from "./components/TopBar/TopBar";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
// import ExampleComponent from "./components/ExampleComponent/ExampleComponent"; //This is an example of how the custom Scroll bar Works. 
import Footer from "./components/Footer/Footer";
import styles from "./app.module.scss";

function App() {
	return (
		<>
			<div className={styles.app}>
				<TopBar />
				<WidgetHolder />
				{/* <ExampleComponent /> */} 
				<Footer />
			</div>
		</>
	);
}

export default App;
