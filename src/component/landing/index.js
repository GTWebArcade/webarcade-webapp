/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.css';
import { API_URL } from '../../api';
import logo from '../../images/logo.png';

function LeftSide() {
  const navigate = useNavigate();

  function navigateSignUp() {
    navigate('/sign-up');
  }

  return (
    <div className={styles.leftSide}>
        <div className={styles.leftBox}>
        <img className={styles.logo} src={logo} alt='logo' width={90} height={40} />
        <h2>GT Web Dev's</h2>
        <h1 className={styles.neon}>Web Arcade</h1>
        <p className={styles.bodyText}>Enter the Georgia Tech Web Dev Web Arcade to play
          and rate user-made WebGL games or upload your own!</p>
        <button className={styles.signUpButton} onClick={navigateSignUp}>Sign Up</button>
        </div>
    </div>
  );
}

function RightSide() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // we call in the onClick fuction in button
  function signIn() {
    // axios call to backend server
    // url of sign in endpoint
    const data = JSON.stringify({
      username,
      password,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/api/v1/auth/sign-in`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/games');
      })
      .catch((error) => {
        console.log(error?.response?.data?.message?.response?.data?.message);
        // eslint-disable-next-line no-alert
        alert('Invalid username or password');
      });
  }

  return (
    <div className={styles.rightSide}>
        <div className={styles.box}>
          <div className={styles.signInBox}>
          <p>Log In</p>
            <label className={styles.inline}>Username</label>
            <input type="text" onChange={(event) => { setUsername(event?.target?.value); }}/>
            <label className={styles.inline}>Password</label>
            <input type="password" onChange={(event) => { setPassword(event?.target?.value); }}/>
            <Button onClick={() => { signIn(); }}variant="primary">Sign In</Button>
          </div>
        </div>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to games page if signed in
    if (localStorage.getItem('user')) {
      navigate('/games');
    }
  }, [navigate]);

  return (
    <div className={styles.landingPage}>
      <LeftSide/>
      <RightSide/>
    </div>
  );
}

export default LandingPage;
