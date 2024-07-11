import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useDispatch, useSelector } from 'react-redux';
import Job from './Job';
import Loading from './Loading';
import { getAllJobs } from '../features/AllJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';
const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);

  const dispatch = useDispatch();
  //   dispatch(getAllJobs());
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to Display ... </h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job
            key={job._id}
            {...job}
          />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
