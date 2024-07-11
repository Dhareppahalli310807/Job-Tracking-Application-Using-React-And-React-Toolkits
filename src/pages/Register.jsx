import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Logo } from '../components';
import { toast } from 'react-hot-toast';
/* ------------------------------ redux imports ----------------------------- */
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

/* -------------------------- local state for redux ------------------------- */
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState(initialState);
  /* ---------------------------- integrating redux --------------------------- */
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  /* ------------------- function for controlled form inputs ------------------ */
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...Values, [name]: value });
  };
  /* ---------------------- function for form submission ---------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = Values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out the empty fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };
  /* ------------------------- toggle login / register ------------------------ */
  const toggleMember = () => {
    setValues({ ...Values, isMember: !Values.isMember });
  };
  /* ---------------------- navigating user to Dashboard ---------------------- */
  useEffect(() => {
    const timer = () =>
      setTimeout(() => {
        navigate('/');
      }, 2000);
    if (user) {
      timer();
    }
    return () => clearTimeout(timer);
  }, [user]);
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />

        <h3>{Values.isMember ? 'login' : 'register'}</h3>
        {/* NAME INPUT */}
        {!Values.isMember && (
          <FormRow
            value={Values.name}
            type='text'
            name='name'
            labelText='name'
            handleChange={handleChange}
          />
        )}

        {/* EMAIL INPUT */}
        <FormRow
          value={Values.email}
          type='email'
          name='email'
          labelText='Email'
          handleChange={handleChange}
        />
        {/* PASSWORD INPUT */}
        <FormRow
          value={Values.password}
          type='password'
          name='password'
          labelText='Password'
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          {isLoading ? 'loading...' : 'Submit'}
        </button>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({
                name: 'john',
                email: 'john@gmail.com',
                password: 'secret',
              })
            )
          }
        >
          {isLoading ? 'loading...' : 'Demo User'}
        </button>
        <p>
          {Values.isMember ? 'Not a member yet?' : 'Already a member'}
          <button
            type='button'
            onClick={toggleMember}
            className='member-btn'
            disabled={isLoading}
          >
            {Values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
