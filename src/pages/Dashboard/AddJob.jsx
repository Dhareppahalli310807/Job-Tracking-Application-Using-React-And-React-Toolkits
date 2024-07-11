import React, { useEffect } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, SelectFormRow } from '../../components';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  addJob,
  clearValues,
  handleChange,
  updateJob,
} from '../../features/job/jobSlice';
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !jobLocation || !company) {
      toast.error('Please fill out all the fields');
      return;
    }

    if (isEditing) {
      dispatch(
        updateJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(addJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  /* --------- optional making job location === user's actual location -------- */
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        <div className='form-center'>
          <FormRow
            type={'text'}
            name={'position'}
            labelText={'Position'}
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type={'text'}
            name={'company'}
            labelText={'company'}
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type={'text'}
            name={'jobLocation'}
            labelText={'job Location'}
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <SelectFormRow
            name='jobType'
            labelText='Job Type'
            options={jobTypeOptions}
            optionsDefault={jobType}
            handleChange={handleJobInput}
          />
          <SelectFormRow
            name='status'
            labelText='Status'
            options={statusOptions}
            optionsDefault={status}
            handleChange={handleJobInput}
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEditing ? 'update' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
