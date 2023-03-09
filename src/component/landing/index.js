/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.css';

function LeftSide() {
  const navigate = useNavigate();

  function navigateSignUp() {
    navigate('/sign-up');
  }

  return (
    <div className={styles.leftSide}>
        <div className={styles.leftBox}>
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
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [tok, setTok] = useState();
  // event?.target?.value store the value of the input field
  // value={username} the text in the username box (not the actual username)

  function signIn() {
    setUser(document.getElementById('user').value);
    setPass(document.getElementById('password').value);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    axios.post(`${API_URL}/api/v1/auth/sign-in`, {
      username: user,
      password: pass,
    }).then((response) => {
      const serverMessage = response?.data?.message || 'no message from server';
      setTok(response?.data?.token);
      console.log(serverMessage);
    }).catch((error) => {
      console.log('Error: ', error?.response?.data?.message);
    });
  }

  return (
    <div className={styles.rightSide}>
        <div className={styles.box}>
          <div className={styles.signInBox}>
          <p>Log In</p>
            <label className={styles.inline}>Username</label>
            <input type="text" id='user' value={user} onChange={(event) => { setUser(event?.target?.value); }}/>
            <label className={styles.inline}>Password</label>
            <input type="password" id='password' value={pass} onChange={(event) => { setPass(event?.target?.value); }}/>
            <Button onClick={() => { signIn(); }}variant="primary">Sign In</Button>
          </div>
        </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <LeftSide/>
      <RightSide/>
    </div>
  );
}

export default LandingPage;
