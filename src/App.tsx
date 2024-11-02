import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/minime/settings" element={<Settings />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
