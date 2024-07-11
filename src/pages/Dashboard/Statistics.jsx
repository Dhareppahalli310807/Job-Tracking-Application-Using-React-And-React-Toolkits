import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/AllJobs/allJobsSlice';
import Loading from '../../components/Loading';
import { LoaderIcon } from 'react-hot-toast';
import { ChartsContainer, StatsContainer } from '../../components';

const Statistics = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Statistics;
