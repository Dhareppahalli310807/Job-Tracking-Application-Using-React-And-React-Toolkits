import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import FormRow from '../../components/FormRow';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../features/user/userSlice';
const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('Please fill all the fields');
      return;
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <Wrapper>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <h3>profile</h3>
        <div className='form-center'>
          <FormRow
            type={'text'}
            name='name'
            value={userData.name}
            labelText={'name'}
            handleChange={handleChange}
          />
          <FormRow
            type={'text'}
            name='lastName'
            value={userData.lastName}
            labelText={'last name'}
            handleChange={handleChange}
          />
          <FormRow
            type={'email'}
            name='email'
            value={userData.email}
            labelText={'email'}
            handleChange={handleChange}
          />
          <FormRow
            type={'text'}
            name='location'
            value={userData.location}
            labelText={'location'}
            handleChange={handleChange}
          />
          <button
            type='submit'
            className='btn btn-block'
            disabled={isLoading}
          >
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
