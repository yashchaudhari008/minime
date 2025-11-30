import type { Dispatch, SetStateAction } from "react";
import Search from "./Search/Search";
import Clock from "./Clock";
import styles from "./topBar.module.scss";

type TopBarProps = {
	searchValue: string;
	setSearchValue: Dispatch<SetStateAction<string>>;
};

const TopBar = ({ searchValue, setSearchValue }: TopBarProps) => {
	return (
		<>
			<div className={styles.topBar}>
				<Clock />
				<Search searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
		</>
	);
};

export default TopBar;
