/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { Unity, useUnityContext } from 'react-unity-webgl';
import styles from './styles.module.css';
import { API_URL } from '../../api';

function GameLoadedPage() {
  const navigate = useNavigate();
  const { unityProvider } = useUnityContext({
    loaderUrl: 'CookingGame/Build/v10 webgl (final build).loader.js',
    dataUrl: 'CookingGame/Build/v10 webgl (final build).data',
    frameworkUrl: 'CookingGame/Build/v10 webgl (final build).framework.js',
    codeUrl: 'CookingGame/Build/v10 webgl (final build).wasm',
  });

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio,
  );

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate('/games');
  };
  const handleShow = () => {
    setShow(true);
  };
  const sendReview = () => {
    axios.post(`${API_URL}/api/v1/game/create-game`, {
      user: JSON.parse(localStorage.getItem('user')).username,
      gameId: new URL(window.location.href).searchParams.get('gameId'),
      ratingScore: rating.toString,
      ratingMessage: review,
      createdAt: Date.now().toString,
      updatedAt: Date.now().toString,
    }).then((response) => {
      const serverMessage = response?.data?.message || 'no message from server';
      console.log(serverMessage);
    }).catch((error) => {
      console.log('Error: ', error?.response?.data?.message);
    });
  };

  const handleChangePixelRatio = useCallback(
    () => {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = () => {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`,
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener('change', updateDevicePixelRatio);
      return () => {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
      };
    },
    [devicePixelRatio],
  );

  useEffect(() => {
    handleChangePixelRatio();
  }, [handleChangePixelRatio]);

  function navigateLanding() {
    navigate('/');
  }

  return (
  <div className={styles.center}>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Before you go back, leave a rating for</p>
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
    <span className={styles.section}>
      <button variant="primary" onClick={handleShow} className={styles.modalBtn}>Go Back</button>
      <h1 className={styles.text}>
      Cooking with ONE!
      </h1>
      <button className={styles.button} onClick={navigateLanding}>Log Out</button>
    </span>
    <Unity unityProvider={unityProvider}
    style={{ width: 800, height: 600 }}
    devicePixelRatio={devicePixelRatio} />
  </div>);
}
export default GameLoadedPage;
