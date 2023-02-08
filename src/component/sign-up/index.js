import { useState } from 'react';
import styles from './styles.module.css';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
        <div className={styles.navigation}>
          <a href='/'>Login</a>
        </div>

        {/* <p className={styles.dummyStyle}>Sign up page</p>
        <a href='/'>Back</a> */}

        <div className={styles.signupcard}>
          <label> Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label> Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label> Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label> Retype Password
            <input
              type="password"
              name="retype-password"
            />
          </label>
          <input type="submit" />
        </div>

    </div>
  );
}

export default SignUpPage;
