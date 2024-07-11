import React from 'react';
import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,
            odit explicabo. Nam, quisquam. Reiciendis incidunt exercitationem
            ullam possimus asperiores qui.
          </p>
          <Link
            to={'/register'}
            className='btn btn-hero'
          >
            Login/Register
          </Link>
        </div>
        <img
          src={main}
          alt='job hunt'
          className='img main-img'
        />
      </div>
    </Wrapper>
  );
};

export default Landing;
