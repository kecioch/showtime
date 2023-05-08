import LoadingButton from "./LoadingButton";
import styles from "./SearchInput.module.css";

const SearchInput = props => {
    const classes = `d-flex align-items-center gap-2 ${props.className}`;
    return (
        <div className={classes}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder={props.placeholder}
          aria-label={props["aria-label"]}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
        />
        <LoadingButton className={styles.searchBtn} isLoading={props.isLoading} onClick={props.onClick}>
          Suchen
        </LoadingButton>
      </div>
    );
};

export default SearchInput;