/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function CreateGamePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gameType, setGameType] = useState('');

  function sendGameInfo() {}

  return (
    <div className={styles.createGameContainer}>
      <div className={styles.gameArea}>
        <div className={styles.inGameArea}>
          <p className={styles.title}>Game Information</p>
          <div className={styles.infoSec}>
            <div className={styles.gameInfo}>
                <label>Name:</label>
                <input id="name" type="text" className={styles.userItem} value={name} onChange={(event) => { setName(event?.target?.value); }}></input>
            </div>
            <div className={styles.gameInfo}>
                <label>Description:</label>
                <input id="desc" type="text" className={styles.userItem} value={description} onChange={(event) => { setDescription(event?.target?.value); }}></input>
            </div>
            <div className={styles.gameInfo}>
                <label>Type:</label>
                <input id="type" type="text" className={styles.userItem} value={gameType} onChange={(event) => { setGameType(event?.target?.value); }}></input>
            </div>
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
