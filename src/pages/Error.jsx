import React from 'react';
import errorImg from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img
          src={errorImg}
          alt='no route found image'
          className=''
        />
        <h3>Ohh! Page not Found</h3>
        <p>We can't seem to find the page you are looking for</p>
        <Link to={'/'}>back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
