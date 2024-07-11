import customFetch from '../../utils/axios';
import { getAllJobs, hideLoading, showLoading } from '../AllJobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';

export const addJobThunk = async (job, thunkAPI) => {
  try {
    const res = await customFetch.post('/jobs', job);
    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging out ...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const res = await customFetch.patch(`jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging out ...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
