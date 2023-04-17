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
  // const [unityProvider, setUnityProvider] = useState(undefined);
  /*
  const { unityProvider } = useUnityContext({
    loaderUrl: 'CookingGame/Build/v10 ,
    dataUrl: 'CookingGame/Build/v10 webgl (final build).data',
    frameworkUrl: 'CookingGame/Build/v10 webgl (final build).framework.js',
    codeUrl: 'CookingGame/Build/v10 webgl (final build).wasm',
  });
  */
  const [game, setGame] = useState(undefined);
  const [name, setName] = useState('');
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    console.log('render');
    const url = `${API_URL}/api/v1/game/${id}`;
    console.log('url', url);
    axios.get(url, {
      headers: getAuthHeaders(),
    }).then((res) => {
      console.log('game info:', res.data);
      setName(res.data.game.name);
      setGame(res.data.game);
    });
  }, [id]);

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

  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(3);

  function navigateLanding() {
    localStorage.removeItem('user');
    location.href = '/';
  }
  function navigateGamesView() {
    const urlSplit = location.href.split('/');
    location.href = `${urlSplit[0]}/games`;
  }

  return (
  <div className={styles.center}>
    <div className={styles.section}>
    <img className={styles.logo} src={logo} alt='logo' width={90} height={40} />
      <button variant="primary" onClick={navigateGamesView} className={styles.modalBtn}>Go Back</button>
      {/* <button className={styles.button} onClick={navigateGamesView}>Back to Games</button> */}
      <button className={styles.button} onClick={navigateLanding}>Log Out</button>
    </div>
    <div className={styles.titleSec}>
      <h1 className={styles.text}>{name}</h1>
    </div>
    {
      game && <UnityWrapper loaderUrl={game.unityLoaderUrl}
      dataUrl={game.unityDataUrl}
      frameworkUrl={game.unityFrameworkUrl} codeUrl={game.unityCodeUrl} />
    }
    <input type="range" id="stars" name="stars" min="0" max="5" value={reviewStars.toString()} onChange={(e) => {
      setReviewStars(parseInt(e?.target?.value || 3, 10));
    }}></input>
    <div>{reviewStars} Stars</div>
    <input onClick={() => {
      // eslint-disable-next-line no-alert
      const newReviewText = window.prompt('Please write a review', reviewText);
      setReviewText(newReviewText);
    }} value={reviewText}></input>
    <button onClick={() => {
      // TODO: review text is in reviewText variable defined earlier
      // TODO: review stars is in reviewStars variable defined earlier
      // eslint-disable-next-line no-alert
      alert(`TODO: make API call to create review object with text ${reviewText} and stars ${reviewStars}`);
    }}>Submit Review</button>
  </div>);
}
export default GameLoadedPage;
