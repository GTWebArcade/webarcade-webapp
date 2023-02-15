import React from 'react';
import styles from './styles.module.css';

function LandingPage() {
  // store input text into variables
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  // event?.target?.value store the value of the input field
  // value={username} the text in the username box (not the actual username)

  // we call in the  onClick fuction in button
  function signIn() {
    // eslint-disable-next-line no-alert
    alert('Not implemented');
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p className={styles.dummyStyle}>Landing page</p>
        <input type="text" value={username} onChange={(event) => { setUsername(event?.target?.value); }}/>
        <input type="password" value={password} onChange={(event) => { setPassword(event?.target?.value); }}/>
        <button onClick={() => { signIn(); }}>Sign In</button>
        <a href='/sign-in'>Sign In</a>
        <a href='/sign-up'>Sign Up</a>
    </div>
  );
}

export default LandingPage;
