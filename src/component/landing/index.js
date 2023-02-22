import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.css';

// function SignInBox() {
//   return (
//     <div>

//     </div>
//   );
// }
function LeftSide() {
  return (
    <div className={styles.leftside}>
      <h2>GT Web Dev's</h2>
      <h1>Web Arcade</h1>
      <p className={styles.bodyText}>Enter the Georgia Tech Web Dev Web Arcade to play
         and rate user-made WebGL games or upload your own!</p>
    </div>
  );
}

function RightSide() {
  // store input text into variables
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  // event?.target?.value store the value of the input field
  // value={username} the text in the username box (not the actual username)

  // we call in the  onClick fuction in button
  function signIn() {
    // 26 min in, implementing axios call to backend
    // eslint-disable-next-line no-alert
    alert('Not implemented');
  }
  return (
    <div className={styles.rightSide}>
        right side
        <div className={styles.signInBox}>
        <p className={styles.dummyStyle}>Landing page</p>
          <input type="text" value={username} onChange={(event) => { setUsername(event?.target?.value); }}/>
          <input type="password" value={password} onChange={(event) => { setPassword(event?.target?.value); }}/>
          <button className ={styles.buttonStyle} onClick={() => { signIn(); }}>Sign In</button>
          <Button onClick={() => { signIn(); }}variant="primary">Sign In</Button>
          <a href='/sign-in'>Sign In</a>
          <a href='/sign-up'>Sign Up</a>
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
