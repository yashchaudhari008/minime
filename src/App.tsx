import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WidgetHolder from "./components/WidgetHolder/WidgetHolder";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import Layout from "./components/Layout/Layout";
import styles from "./app.module.scss";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<WidgetHolder />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;