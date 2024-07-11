import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';

export const getAllJobsThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging out ... ');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const showStatsThunk = async (url, thunkAPI) => {
  try {
    const res = await customFetch.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging out ...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
