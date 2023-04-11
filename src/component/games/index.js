/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Rating } from 'react-simple-star-rating';
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

  const [games, setGames] = useState([]); // Make array for games
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    window.location.reload();
    await localStorage.setItem('page', 'games');
    handleShow();
    setShow(true);
  };

  useEffect(() => {
    // navigate to landing page if not signed in
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/games`).then((res) => {
      // TODO: fix sytax
      setGames(res.data.games);
    });
    if (localStorage.getItem('page') === 'games-loaded') {
      handleShow();
    }
  }, []);

  const sendReview = () => {
    axios.post(`${API_URL}/api/v1/game/create-game`, {
      user: JSON.parse(localStorage.getItem('user')).id,
      gameId: new URL(window.location.href).searchParams.get('gameId'),
      ratingScore: rating,
      ratingMessage: review,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }).then((response) => {
      const serverMessage = response?.data?.message || 'no message from server';
      console.log(serverMessage);
      setShow(false);
    }).catch((error) => {
      console.log('Error: ', error?.response?.data?.message);
    });
  };

  return (
      <div style = {{ backgroundColor: '#c16dcf' }}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Before you player another game, leave a rating.</p>
            <Rating
              onClick={handleRating}
              // onPointerEnter={onPointerEnter}
              // onPointerLeave={onPointerLeave}
              // onPointerMove={onPointerMove}
            />
            <p className={styles.title3}>Leave a review as well.</p>
            <textarea id="rev" type="text" wrap='soft' className={styles.review} placeholder='Give a review.' value={review} onChange={(event) => { setReview(event?.target?.value); }}></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={sendReview}>Submit</Button>
          </Modal.Footer>
        </Modal>
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
