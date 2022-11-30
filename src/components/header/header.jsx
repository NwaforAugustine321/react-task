import React from 'react';
import styles from './header.scss';
import { BiUser } from 'react-icons/bi';
import { AuthContext } from '../../authContext';

const Header = () => {
  const { dispatch } = React.useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };
  return (
    <>
      <div className='flex justify-between text-gray-700 header_container'>
        <h1 className='title'>App</h1>
        <div className='logout_btn flex gap-x-2 items-center justify-center'>
          <BiUser />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Header;
