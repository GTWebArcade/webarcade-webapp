import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

function SignInPage() {
  const [messageFromServer, setMessageFromServer] = useState(undefined);

  useEffect(() => {
    // dummy example of how to make a request to our server
    // note: make sure the server is running on your machine
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    axios.get(API_URL).then((response) => {
      const serverMessage = response?.data?.message || 'no message from server';
      setMessageFromServer(`Got this message from our server: ${serverMessage}`);
    }).catch((error) => {
      setMessageFromServer('Error communicating with server');
      console.error('Error communicating with server', error);
    });
  }, []);

  return (
    <div>
        <p className={styles.dummyStyle}>Sign in page</p>
        <p>{messageFromServer || 'communicating with server...'}</p>
        <a href='/'>Back</a>
    </div>
  );
}

export default SignInPage;
