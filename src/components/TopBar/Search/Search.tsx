import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.scss';

type SearchProps = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const Search = ({ searchValue, setSearchValue }: SearchProps) => {
  const onSearch = (e: FormEvent) => {
    e.preventDefault();

    let url = "https://www.google.com/search?q=";
    window.open(url + searchValue);
  }

  return (
    <form onSubmit={onSearch} className={styles.searchForm}>
      <div className={styles.searchBox}>
        <label htmlFor="search"><FontAwesomeIcon icon={faSearch} className={styles.icon} /></label>
        <input
          type="search"
          placeholder="Search..."
          id='search'
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <span>Press ENTER to search on google</span>
    </form>
  )
}

export default Search;
