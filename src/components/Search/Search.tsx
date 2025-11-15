import styles from './search.module.scss';

const Search = () => {
  return (
    <form className={styles.searchForm}><input type="search" placeholder="Search..." /></form>
  )
}

export default Search;
