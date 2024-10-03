import React from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";
// import styles from "../layout.module.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== "/settings" && <TopBar />}
            {children}
            {location.pathname !== "/settings" && <Footer />}
        </div>
    );
};

export default Layout;