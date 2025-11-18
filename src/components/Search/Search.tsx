import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
import styles from './search.module.scss';

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();

    let url = "https://www.google.com/search?q=";
    window.open(url + searchValue);
  }

  return (
    <form onSubmit={onSearch} className={styles.searchForm}>
      <label htmlFor="search"><FontAwesomeIcon icon={faSearch} /></label>
      <input
        type="search"
        placeholder="Search..."
        id='search'
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  )
}

export default Search;
