import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.svg';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <nav className={styles.container}>
      <Link to='/'><img src={Logo} alt="A cute owl" /></Link>
      <ul>
        {user ? (
          <>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/hoots'>HOOTS</Link></li>
            <li><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
            <li><Link to='/hoots/new'>NEW HOOT</Link></li>
          </>
        ) : (
          <>
            <li><Link to='/signin'>Sign In</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
