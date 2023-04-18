/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Unity, useUnityContext } from 'react-unity-webgl';
import { Rating } from 'react-simple-star-rating';
import styles from './styles.module.css';
import { API_URL, getAuthHeaders } from '../../api';
import logo from '../../images/logo.png';

function UnityWrapper(props) {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: props.loaderUrl,
    dataUrl: props.dataUrl,
    frameworkUrl: props.frameworkUrl,
    codeUrl: props.codeUrl,
  });
  return (
    <>
    {!isLoaded && (
      <h1 className={styles.loading}>Loading Application...
      {Math.round(loadingProgression * 100)}%</h1>
    )}
    <Unity unityProvider={unityProvider}
    style={{ width: 800, height: 600 }}
    devicePixelRatio={devicePixelRatio} />
    </>
  );
}

function GameLoadedPage() {
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([{
    _id: '0', user: '', ratingMessage: '', ratingScore: 0,
  }]);
  const [game, setGame] = useState(undefined);
  const [name, setName] = useState('');
  const { id } = useParams();
  function getRatings() {
    axios.get(`${API_URL}/api/v1/rating/get-ratings/${id}`, {
      headers: getAuthHeaders(),
    }).then((res) => {
      if (res.data.ratings) {
        setReviews(res.data.ratings);
      }
    });
  }

  useEffect(() => {
    getRatings();
    const url = `${API_URL}/api/v1/game/${id}`;
    axios.get(url, {
      headers: getAuthHeaders(),
    }).then((res) => {
      setName(res.data.game.name);
      setGame(res.data.game);
    });
  }, [id, getRatings]);

  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio,
  );

  // try to remove the alert with the error - just print to console

  // function alert(message) {
  //   console.log(message);
  // }

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
  function navigateGamesView() {
    // localStorage.setItem('page', 'loaded');
    const urlSplit = location.href.split('/');
    location.href = `${urlSplit[0]}/games`;
  }

  function handleReview() {
    axios.post(`${API_URL}/api/v1/rating/post-rating`, {
      user: JSON.parse(localStorage.getItem('user')).username,
      gameId: id,
      ratingScore: rating,
      ratingMessage: reviewText,
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

    setReviewText('');
    setRating(0);
    getRatings();
  }

  return (
    <div className={styles.center}>
      <div className={styles.section}>
        <img className={styles.logo} src={logo} alt='logo' width={90} height={40} />
        <button variant="primary" onClick={navigateGamesView} className={styles.modalBtn}>LEAVE GAME</button>
        <button className={styles.button} onClick={navigateLanding}>LOG OUT</button>
      </div>
      <div className={styles.titleSec}>
        <h1 className={styles.text}>{name.toUpperCase()}</h1>
      </div>
      <div className={styles.gameContainer}>
        <div>
        {
          game && <UnityWrapper loaderUrl={game.unityLoaderUrl}
          dataUrl={game.unityDataUrl}
          frameworkUrl={game.unityFrameworkUrl} codeUrl={game.unityCodeUrl} />
        }
        </div>
        <div className={styles.reviewContainer}>
          <h3>REVIEWS</h3>
          <div className={styles.postReview}>
            <div className={styles.reviewContent}>
              <Rating
                  onClick={handleRating}
                  initialValue={rating}
              />
              <div className={styles.reviewInput}>
                <input placeholder='Give a review...' onClick={() => {
                  // eslint-disable-next-line no-alert
                  const newReviewText = window.prompt('Please write a review', reviewText);
                  setReviewText(newReviewText);
                }} value={reviewText}></input>
              </div>
            </div>
            <button onClick={handleReview}>POST</button>
          </div>
          <div className={styles.reviewItems}>
            {reviews.map((review) => (
              <div className={styles.rContainer}>
                <div className={styles.viewContainer} key={review._id}>
                  <div className={styles.mainPart}>
                    <p>{review.user}</p>
                    <div className={styles.starRating}>
                      <Rating
                          initialValue={review.ratingScore}
                          size={20}
                          readonly={true}
                      />
                    </div>
                  </div>
                  <p>{review.ratingMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameLoadedPage;
