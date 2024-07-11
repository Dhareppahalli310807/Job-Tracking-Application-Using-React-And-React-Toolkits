import React, { useState, useMemo } from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { FormRow, SelectFormRow } from './index.js';
import { clearFilters, handleChange } from '../features/AllJobs/allJobsSlice';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({ name, value }));
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            labelText='Search job'
            handleChange={optimizedDebounce}
          />
          <SelectFormRow
            labelText={'status'}
            name={'searchStatus'}
            optionsDefault={searchStatus}
            handleChange={handleSearch}
            options={['all', ...statusOptions]}
          />
          <SelectFormRow
            labelText={'Type'}
            name={'searchType'}
            optionsDefault={searchType}
            handleChange={handleSearch}
            options={['all', ...jobTypeOptions]}
          />
          <SelectFormRow
            labelText={'sort'}
            name={'sort'}
            optionsDefault={sort}
            handleChange={handleSearch}
            options={sortOptions}
          />
          <button
            type='button'
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
