/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.css';

function LeftText() {
  return (
    <div className={styles.leftside}>
      <h1>Games</h1>
    </div>
  );
}

function signOut() { // Currently a place-holder; will need to add the actual function later
  // eslint-disable-next-line no-alert
  alert('Not Implemented Yet');
}

function RightText() {
  return (
    <div className={styles.alignRight}>
      <Button onClick={() => { (signOut()); }}variant="primary">Sign Out</Button>
    </div>
  );
}

function GamesPage() {
  const [games, setGames] = React.useState([ // Make array for games
    {
      name: 'game 1',
    },
    {
      name: 'game 2',
    },
  ]);

  React.useEffect(() => {
    axios.get('serverurl/games').then((res) => {
      // TODO: fix sytax
      setGames(res.body);
    });
  }, []);

  return (
      <div>
        <div className={styles.classone}>
          <LeftText/>
          <RightText/>
        </div>
        <div style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', padding: '20px',
        }}>
          {games.map((game, imageURL, gameDataURL) => ( // What to display for each game. Add stuff
              <div style={{ width: '300px', height: '300px', background: 'white' }} >
                <p>{game.name}</p>
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
