import React from 'react';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import Navlinks from './Navlinks';
import { toggleSidebar } from '../features/user/userSlice';
const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
