/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { API_URL, getAuthHeaders } from '../../api';
import logo from '../../images/logo.png';

function LeftText() {
  const navigate = useNavigate();
  return (
    <div className={styles.leftside}>
      <img src={logo} alt='logo' width={90} height={40} />
      <div className={styles.btn1}>
        <button onClick={() => { navigate('/create-game'); }} variant="primary" className={styles.createBtn}>UPLOAD GAME</button>
      </div>
    </div>
  );
}

function RightText() {
  const navigate = useNavigate();

  function signOut() { // Currently a place-holder; will need to add the actual function later
    try {
      localStorage.removeItem('user');
      navigate('/');
    } catch (e) {
      console.error('Error removing user', e);
      // eslint-disable-next-line no-alert
      alert('Unable to sign out');
    }
  }

  return (
    <div className={styles.alignRight}>
      <button onClick={() => { (signOut()); }} variant="primary">LOG OUT</button>
    </div>
  );
}

function GamesPage() {
  const navigate = useNavigate();

  const [games, setGames] = useState([]); // Make array for games
  const [user, setUser] = useState('');

  useEffect(() => {
    // navigate to landing page if not signed in
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
    setUser(JSON.parse(localStorage.getItem('user')).username.toUpperCase());
  }, [navigate]);

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/games`, {
      headers: getAuthHeaders(),
    }).then((res) => {
      // TODO: fix sytax
      setGames(res.data.games);
    });
    // if (localStorage.getItem('page') === 'loaded') {
    //   handleShow();
    // }
  }, []);

  return (
      <div className={styles.gamesWrap}>
        <div className={styles.classone}>
          <LeftText/>
          <RightText/>
        </div>
        <div className={styles.welcome}>
          <p>WELCOME BACK, {user}!</p>
          <input type='text' placeholder='Find a game...'/>
        </div>
        <div className={styles.entrance}>
          <p>ENTER THE ARCADE</p>
        </div>
        <div className={styles.allGames}>
          {games.map((game) => ( // What to display for each game. Add stuff
              <div className={styles.gameContainer}>
                <div className={styles.gameTitle}>
                  <p>{game.name}</p>
                </div>
                <div className={styles.gameCard} key={game._id}
                  onClick={() => {
                    // eslint-disable-next-line no-underscore-dangle
                    navigate(`/games-loaded/${game._id}`);
                  } }>
                  <img className={styles.gameImage} src={game.imageUrl} alt={game.name}></img>
                  <p className={styles.gameDescription}>
                    {game.description}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

/*
(current) game database object schema format:
{
name: String,
imageURL: String,
gameDataURL: String
}
*/

export default GamesPage;
