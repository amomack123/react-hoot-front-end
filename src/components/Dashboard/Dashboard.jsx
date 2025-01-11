import React from 'react';
import styles from './Dashboard.module.css'; // Create this CSS file for styling
import Logo from '../../assets/images/logo.svg'; // Ensure the path to the owl icon is correct

const Dashboard = ({ user }) => {
  return (
    <div className={styles.dashboard}>
      <img src={Logo} alt="A cute owl" className={styles.owlIcon} />
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
};

export default Dashboard;
