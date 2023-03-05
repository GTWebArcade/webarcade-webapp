import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import styles from './styles.module.css';

function LeftSide() {
  return (
    <div className={styles.leftSide}>
        <div className={styles.leftBox}>
        <h2>GT Web Dev's</h2>
        <h1 className={styles.neon}>Web Arcade</h1>
        <p className={styles.bodyText}>Enter the Georgia Tech Web Dev Web Arcade to play
          and rate user-made WebGL games or upload your own!</p>
        <button className ={styles.signUpButton}>Sign Up</button>
        </div>
    </div>
  );
}

function RightSide() {
  // store input text into variables
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  // event?.target?.value store the value of the input field
  // value={username} the text in the username box (not the actual username)

  // we call in the onClick fuction in button
  function signIn() {
    // axios call to backend server
    // url of sign in endpoint
    axios.post('http://localhost:8080/api/v1/sign-in', {
      // passes this info to the backend
      username,
      password,
      // response
    }).then((res) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(res.data));
      // TODO: store access token in local storage
    }).catch((err) => {
      // eslint-disable-next-line no-alert
      alert('Error communicating with the server');
      console.error(err);
    });
  }
  return (
    <div className={styles.rightSide}>
        <div className={styles.box}>
          <div className={styles.signInBox}>
          <p>Log In</p>
            <label className={styles.inline}>Username</label>
            <input type="text" value={username} onChange={(event) => { setUsername(event?.target?.value); }}/>
            <label className={styles.inline}>Password</label>
            <input type="password" value={password} onChange={(event) => { setPassword(event?.target?.value); }}/>
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
