/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { API_URL } from '../../api';

function LeftText() {
  return (
    <div className={styles.leftside}>
      <h1>Games</h1>
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
      {/* <span className={styles.name}>Hello,
      {JSON.parse(localStorage.getItem('user')).username}</span> */}
      <div className={styles.btn1}>
        <button onClick={() => { navigate('/create-game'); }} variant="primary" className={styles.createBtn}>Upload Game</button>
      </div>
      <button onClick={() => { (signOut()); }} variant="primary">Sign Out</button>
    </div>
  );
}

function GamesPage() {
  const navigate = useNavigate();

  const [games, setGames] = React.useState([ // Make array for games

  ]);

  React.useEffect(() => {
    // navigate to landing page if not signed in
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  React.useEffect(() => {
    axios.get(`${API_URL}/api/v1/games`).then((res) => {
      // TODO: fix sytax
      setGames(res.data.games);
      console.log(res.data.games);
    });
  }, []);

  return (
      <div style = {{ backgroundColor: '#c16dcf' }}>
        <div className={styles.classone}>
          <LeftText/>
          <RightText/>
        </div>
        <div style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', padding: '20px',
        }}>
          {games.map((game) => ( // What to display for each game. Add stuff
              // eslint-disable-next-line no-underscore-dangle
              <div style={{ width: '300px', height: '300px', background: 'white' }} key = {game._id}
                onClick={() => {
                  // eslint-disable-next-line no-underscore-dangle
                  navigate(`/game-loaded?gameId=${game._id}`);
                }}>
                <p>{game.name}</p>
                <p>{game.imageURL}</p>
                <img width = "100%" height = "auto" src = {game.imageUrl} alt = {game.name}></img>
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
