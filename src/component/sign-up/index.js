import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { API_URL, getAuthHeaders } from '../../api';
import logo from '../../images/logo.png';

function SignUpPage() {
  const [user, setUser] = useState();
  const [ema, setEma] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCPass] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to games page if signed in
    if (localStorage.getItem('user')) {
      navigate('/games');
    }
  }, [navigate]);

  function sendSignupInfo() {
    setUser(document.getElementById('user').value);
    setEma(document.getElementById('email').value);
    setPass(document.getElementById('password').value);
    setCPass(document.getElementById('cpassword').value);

    axios.post(`${API_URL}/api/v1/auth/sign-up`, {
      username: user,
      email: ema,
      password: pass,
      cpassword: cpass,
    }, {
      headers: getAuthHeaders(),
    }).then((response) => {
      const serverMessage = response?.data?.message || 'no message from server';
      console.log(serverMessage);
      setUser('');
      setEma('');
      setPass('');
      setCPass('');
      navigate('/');
    }).catch((error) => {
      console.log('Error: ', error?.response?.data?.message);
      setUser('');
      setEma('');
      setPass('');
      setCPass('');
    });
  }

  function navigateLogin() {
    navigate('/');
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} alt='logo' width={90} height={40} />
        <button className={styles.loginButton} onClick={navigateLogin}>LOGIN</button>
      </div>
      <div className={styles.signupArea}>
        <div className={styles.inSignup}>
          <p className={styles.title}>SIGN UP</p>
          <div className={styles.infoSec}>
            <div className={styles.info}>
                <label>Username:</label>
                <input id="user" type="text" className={styles.userItem} value={user} onChange={(event) => { setUser(event?.target?.value); }}></input>
            </div>
            <div className={styles.info}>
                <label>Email:</label>
                <input id="email" type="email" value={ema} onChange={(event) => { setEma(event?.target?.value); }}></input>
            </div>
            <div className={styles.info}>
                <label>Password:</label>
                <input id="password" type="password" value={pass} onChange={(event) => { setPass(event?.target?.value); }}></input>
            </div>
            <div className={styles.info}>
                <label>Confirm Password:</label>
                <input id="cpassword" type="password" value={cpass} onChange={(event) => { setCPass(event?.target?.value); }}></input>
            </div>
          </div>

          <div className={styles.sbtnContainer}>
            <button id="sign-up-btn" onClick={sendSignupInfo}>Sign Up</button>
          </div>
          {/* <div className={styles.createAccount}>
            <span id="label-ca">Don't have an account?  </span>
            <a className={styles.links} href="/sign-up">Create Account</a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
