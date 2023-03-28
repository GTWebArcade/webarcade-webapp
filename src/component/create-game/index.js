/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { API_URL } from '../../api';

function CreateGamePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [loaderurl, setLoaderUrl] = useState('');
  const [dataurl, setDataUrl] = useState('');
  const [frameworkurl, setFrameworkUrl] = useState('');
  const [codeurl, setCodeUrl] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const navigate = useNavigate();

  async function sendGameInfo() {
    setLoaderUrl(document.getElementById('loader').value);
    setDataUrl(document.getElementById('data').value);
    setFrameworkUrl(document.getElementById('framework').value);
    setCodeUrl(document.getElementById('code').value);
    setImageUrl(document.getElementById('image').value);
    try {
      const serverMessage = await axios.post(`${API_URL}/api/v1/file-upload`, { file: loaderurl });
      console.log(serverMessage);
    } catch (e) {
      console.log(e);
    }
    try {
      const serverMessage2 = await axios.post(`${API_URL}/api/v1/file-upload`, { file: dataurl });
      console.log(serverMessage2);
    } catch (e) {
      console.log(e);
    }
    try {
      const serverMessage3 = await axios.post(`${API_URL}/api/v1/file-upload`, { file: frameworkurl });
      console.log(serverMessage3);
    } catch (e) {
      console.log(e);
    }
    try {
      const serverMessage4 = await axios.post(`${API_URL}/api/v1/file-upload`, { file: codeurl });
      console.log(serverMessage4);
    } catch (e) {
      console.log(e);
    }

    axios.post(`${API_URL}/api/v1/game/create-game`, {
      name: document.getElementById('name').value,
      description: document.getElementById('desc').value,
      gameType: document.getElementById('type').value,
      dataUrl: dataurl,
      loaderUrl: loaderurl,
      frameworkUrl: frameworkurl,
      codeUrl: codeurl,
      imageUrl: imageurl,
      uploaderUserId: localStorage.getItem('user'),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }).then((response) => {
      const serverMessage = response?.data?.message || 'no message from server';
      console.log(serverMessage);
    }).catch((error) => {
      console.log('Error: ', error?.response?.data?.message);
    });
  }

  function navigateBack() {
    navigate('/');
  }

  return (
    <div className={styles.createGameContainer}>
      <div className={styles.header}>
          <p>LOGO</p>
          <button className={styles.loginButton} onClick={navigateBack}>Back</button>
      </div>
      <div className={styles.gameArea}>
        <div className={styles.inGameArea}>
          <p className={styles.title}>Game Information</p>
          <div className={styles.infoSec}>
            <div className={styles.left}>
              <div className={styles.gameInfo}>
                  <label>Name:</label>
                  <input id="name" type="text" className={styles.userItem} value={name} onChange={(event) => { setName(event?.target?.value); }}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Description:</label>
                  <input id="desc" type="text" className={styles.userItem} value={description} onChange={(event) => { setDescription(event?.target?.value); }}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Game Type:</label>
                  <input id="type" type="text" className={styles.userItem} value={type} onChange={(event) => { setType(event?.target?.value); }}></input>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.gameInfo}>
                  <label>Loader Url:</label>
                  <input id="loader" type="file" className={styles.userItem}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Data Url:</label>
                  <input id="data" type="file" className={styles.userItem}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Framework Url:</label>
                  <input id="framework" type="file" className={styles.userItem}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Code Url:</label>
                  <input id="code" type="file" className={styles.userItem}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Image Url:</label>
                  <input id="image" type="file" className={styles.userItem}></input>
              </div>
            </div>
          </div>

          <div className={styles.sbtn}>
            <button id="game-btn" onClick={sendGameInfo}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGamePage;
