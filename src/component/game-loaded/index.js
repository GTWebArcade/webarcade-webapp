/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Unity, useUnityContext } from 'react-unity-webgl';
import styles from './styles.module.css';

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

  const goBack = () => {
    localStorage.setItem('page', 'games-loaded');
    navigate('/games');
    // window.location.reload();
  };

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

  return (
  <div className={styles.center}>
    <span className={styles.section}>
      <button variant="primary" onClick={goBack} className={styles.modalBtn}>Go Back</button>
      <h1 className={styles.text}>Cooking with ONE!</h1>
      <button className={styles.button} onClick={navigateLanding}>Log Out</button>
    </span>
    <Unity unityProvider={unityProvider}
    style={{ width: 800, height: 600 }}
    devicePixelRatio={devicePixelRatio} />
  </div>);
}
export default GameLoadedPage;
