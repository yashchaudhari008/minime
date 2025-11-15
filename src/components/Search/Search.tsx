import { SubmitHandler, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.scss';

interface Inputs {
  searchValue: string;
}

const Search = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSearch: SubmitHandler<Inputs> = ({ searchValue }) => {
    let url = "https://www.google.com/search?q=";
    window.open(url + searchValue);

    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSearch)} className={styles.searchForm}>
      <label htmlFor="search"><FontAwesomeIcon icon={faSearch} /></label>
      <input
        {...register('searchValue', { required: true })}
        type="search"
        placeholder="Search..."
        id='search'
      />
    </form>
  )
}

export default Search;
