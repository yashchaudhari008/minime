import { SubmitHandler, useForm } from 'react-hook-form';
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
      <input
        type="search"
        placeholder="Search..."
        {...register('searchValue')}
      />
    </form>
  )
}

export default Search;
