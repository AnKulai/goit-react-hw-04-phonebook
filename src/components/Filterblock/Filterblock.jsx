import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Filterblock.module.scss';

const Filterblock = ({ title, filterList }) => {
  const [keyword, setKeyword] = useState('');

  const handleFilter = event => {
    const inputValue = event.target.value;
    setKeyword(inputValue);
    filterList(inputValue.toLowerCase());
  };

  return (
    <form className={css.filteblock}>
      <label htmlFor="filterInput">{title}</label>
      <div className={keyword ? css.ActiveInputWrapper : css.inputWrapper}>
        <input
          type="text"
          id="filterInput"
          name="filter"
          value={keyword}
          onChange={handleFilter}
        />
      </div>
    </form>
  );
};

Filterblock.propTypes = {
  title: PropTypes.string.isRequired,
  filterList: PropTypes.func.isRequired,
};

export default Filterblock;