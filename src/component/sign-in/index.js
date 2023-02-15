/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoEyeOff, IoEye, IoPerson } from 'react-icons/io5';
import styles from './styles.module.css';

function SignInPage() {
  // const [messageFromServer, setMessageFromServer] = useState(undefined);
  const [inputType, setInputType] = useState('password');
  const [imgType, setImgType] = useState();
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [tok, setTok] = useState();
  let count = 0;

  function changeInfo() {
    if (count === 0) {
      setInputType('text');
      setImgType(<IoEye className={styles.icons} onClick={changeInfo}/>);
      count = 1;
    } else {
      setInputType('password');
      setImgType(<IoEyeOff className={styles.icons} onClick={changeInfo}/>);
      count = 0;
    }
  }

  function sendLoginInfo() {
    setUser(document.getElementById('user').value);
    setPass(document.getElementById('password').value);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    axios.post(`${API_URL}/api/auth/signin`, {
      username: user,
      password: pass,
    }).then((response) => {
      const serverMessage = response?.data?.message || 'no message from server';
      setTok(response?.data?.token);
      console.log(serverMessage);
    }).catch((error) => {
      console.error('Error communicating with server', error);
    });

    // axios.get(`${API_URL}/api/user/check`, {
    //   token: tok,
    // }).then((response) => {
    //   const message = response?.data;
    //   console.log(message);
    // });
  }

  useEffect(() => {
    setImgType(<IoEyeOff className={styles.icons} onClick={changeInfo}/>);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <body>
      <div className={styles.loginArea}>
        <div className={styles.inLogin}>
          <p className={styles.title}>Log In to <br></br>WebArcade</p>
          <div className={styles.infoSec}>
            <div className={styles.info}>
                <label for="user">Username:</label>
                <div className={styles.userCont}>
                  <input id="user" type="text" className={styles.userItem} value={user} onChange={(event) => { setUser(event?.target?.value); }}></input>
                  <IoPerson className={styles.icons} />
                </div>
            </div>
            <div className={styles.info}>
                <label for="password">Password:</label>
                <div className={styles.passShow}>
                  <input id="password" type={inputType} value={pass} onChange={(event) => { setPass(event?.target?.value); }}></input>
                  {imgType}
                </div>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <button id="sign-in-btn" onClick={sendLoginInfo}>Login</button>
          </div>

          <div className={styles.createAccount}>
            <span id="label-ca">Don't have an account?  </span>
            <a className={styles.links} href="/sign-up">Create Account</a>
          </div>
          <a className={styles.links} href='/'>Back</a>
        </div>
      </div>
    </body>
  );
}

export default SignInPage;
