/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { API_URL, getAuthHeaders } from '../../api';

function CreateGamePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Unity');
  const [loaderFile, setLoaderFile] = useState('');
  const [dataFile, setDataFile] = useState('');
  const [frameworkFile, setFrameworkFile] = useState('');
  const [codeFile, setCodeFile] = useState('');
  const [imageFile, setImageFile] = useState('');
  const navigate = useNavigate();

  async function sendGameInfo() {
    // eslint-disable-next-line max-len
    if (!name || !description || !type || !loaderFile || !dataFile || !frameworkFile || !codeFile || !imageFile) {
      // eslint-disable-next-line no-alert
      alert('Please fille out all fields');
      return;
    }

    let loaderUrl;
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('gamedata', loaderFile);
      const serverMessage = await axios.post(`${API_URL}/api/v1/file-upload`, bodyFormData, {
        headers: getAuthHeaders(),
      });
      console.log(serverMessage);
      loaderUrl = serverMessage.data.FileURL;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line no-alert
      alert('Error uploading loader file');
      return;
    }

    let dataUrl;
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('gamedata', dataFile);
      const serverMessage2 = await axios.post(`${API_URL}/api/v1/file-upload`, bodyFormData, {
        headers: getAuthHeaders(),
      });
      console.log(serverMessage2);
      dataUrl = serverMessage2.data.FileURL;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line no-alert
      alert('Error uploading data file');
      return;
    }

    let frameworkUrl;
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('gamedata', frameworkFile);
      const serverMessage3 = await axios.post(`${API_URL}/api/v1/file-upload`, bodyFormData, {
        headers: getAuthHeaders(),
      });
      console.log(serverMessage3);
      frameworkUrl = serverMessage3.data.FileURL;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line no-alert
      alert('Error uploading framework file');
      return;
    }

    let codeUrl;
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('gamedata', codeFile);
      const serverMessage4 = await axios.post(`${API_URL}/api/v1/file-upload`, bodyFormData, {
        headers: getAuthHeaders(),
      });
      console.log(serverMessage4);
      codeUrl = serverMessage4.data.FileURL;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line no-alert
      alert('Error uploading code file');
      return;
    }

    let imageUrl;
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('gamedata', imageFile);
      const serverMessage5 = await axios.post(`${API_URL}/api/v1/file-upload`, bodyFormData, {
        headers: getAuthHeaders(),
      });
      console.log(serverMessage5);
      imageUrl = serverMessage5.data.FileURL;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line no-alert
      alert('Error uploading image file');
      return;
    }

    axios.post(`${API_URL}/api/v1/game/create-game`, {
      name: document.getElementById('name').value,
      description: document.getElementById('desc').value,
      gameType: document.getElementById('type').value,
      dataUrl,
      loaderUrl,
      frameworkUrl,
      codeUrl,
      imageUrl,
      uploaderUserId: JSON.parse(localStorage.getItem('user')).id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }, {
      headers: getAuthHeaders(),
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
                  <textarea id="desc" type="text" wrap='soft' className={styles.desc} value={description} onChange={(event) => { setDescription(event?.target?.value); }}></textarea>
              </div>
              <div className={styles.gameInfo}>
                  <label>Game Type:</label>
                  <input id="type" type="text" className={styles.userItem} value={type} onChange={(event) => { setType(event?.target?.value); }}></input>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.gameInfo}>
                  <label>Loader Url:</label>
                  <input id="loader" type="file" className={styles.userItem} onChange={(event) => { setLoaderFile(event?.target?.files[0]); }}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Data Url:</label>
                  <input id="data" type="file" className={styles.userItem} onChange={(event) => { setDataFile(event?.target?.files[0]); }}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Framework Url:</label>
                  <input id="framework" type="file" className={styles.userItem} onChange={(event) => { setFrameworkFile(event?.target?.files[0]); }}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Code Url:</label>
                  <input id="code" type="file" className={styles.userItem} onChange={(event) => { setCodeFile(event?.target?.files[0]); }}></input>
              </div>
              <div className={styles.gameInfo}>
                  <label>Image Url:</label>
                  <input id="image" type="file" className={styles.userItem} onChange={(event) => { setImageFile(event?.target?.files[0]); }}></input>
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
