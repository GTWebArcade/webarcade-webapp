/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import GameCard from '../game-cards';

function GameViewPage() {
  const [phrase, setPhrase] = useState('');
  const ignore = useRef(false);
  const [gameList, setGameList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  function getGames() {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    axios.get(`${API_URL}/api/v1/games`, {}).then((response) => {
      for (let i = 0; i < response?.data?.games.length; i += 1) {
        console.log(response?.data?.games[i]?.name);
        gameList.push(response?.data?.games[i]);
        filteredList.push(response?.data?.games[i]);

        // const game = document.createElement('GameCard', { header: 'name', body: 'working' });
        // const name = document.createTextNode(response?.data?.games[i]?.name);
        // game.appendChild(name);

        // const section = document.getElementById('games');
        // section.appendChild(game);

        // const card = gameCardTemplate.content.cloneNode(true).children[0];
        // const header = card.querySelector('[game-header]');
        // const body = card.querySelector('[game-body]');
        // header.textContent = response?.data?.games[i]?.name;
        // body.textContent = response?.data?.games[i]?.imageUrl;
        // gameCardContainer.append(card);
      }
    });
  }

  function filterGames() {
    const section = document.getElementById('games');
    while (section.hasChildNodes()) {
      section.removeChild(section.firstChild);
    }
    const filter = document.getElementById('searchbar').value.toLowerCase();
    setPhrase(filter);

    setFilteredList([]);

    for (let i = 0; i < gameList.length; i += 1) {
      if (gameList[i].name.toLowerCase().includes(filter)) {
        console.log(gameList[i]);
        filteredList.push(gameList[i]);
        // const game = document.createElement('p');
        // const name = document.createTextNode(gameList[i].name);
        // game.appendChild(name);

        // section.appendChild(game);
      }
    }
  }

  useEffect(() => {
    if (ignore.current) return;
    ignore.current = true;
    getGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.gameArea}>
        <input id="searchbar" type="text" className={styles.searchBar} onChange={filterGames}></input>
        <div id='games'>{filteredList.map((game) => <GameCard header={game.name} body={game.imageUrl}/>)}</div>
        {/* <div id='games'></div> */}
    </div>
    // {/* <button onClick={test}>Games</button> */}
  );
}

export default GameViewPage;
