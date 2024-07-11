import React from 'react';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useDispatch, useSelector } from 'react-redux';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { changePage } from '../features/AllJobs/allJobsSlice';
const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };
  return (
    <Wrapper>
      <button
        type='button'
        className='prev-btn'
        onClick={prevPage}
      >
        {' '}
        <HiChevronDoubleLeft />{' '}
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => (
          <button
            type='button'
            key={pageNumber}
            onClick={() => dispatch(changePage(pageNumber))}
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        type='button'
        className='next-btn'
        onClick={nextPage}
      >
        {' '}
        <HiChevronDoubleRight />{' '}
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
