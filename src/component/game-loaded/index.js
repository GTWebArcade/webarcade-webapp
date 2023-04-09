import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Unity, useUnityContext } from 'react-unity-webgl';
import styles from './styles.module.css';
import { API_URL } from '../../api';
// import { getPost, getPosts } from './api';
function UnityWrapper(props) {
  const { unityProvider } = useUnityContext({
    loaderUrl: props.loaderUrl,
    dataUrl: props.dataUrl,
    frameworkUrl: props.frameworkUrl,
    codeUrl: props.codeUrl,
  });
  return (<Unity unityProvider={unityProvider}
  style={{ width: 800, height: 600 }}
  devicePixelRatio={devicePixelRatio} />);
}

function GameLoadedPage() {
  // const [unityProvider, setUnityProvider] = useState(undefined);
  /*
  const { unityProvider } = useUnityContext({
    loaderUrl: 'CookingGame/Build/v10 ,
    dataUrl: 'CookingGame/Build/v10 webgl (final build).data',
    frameworkUrl: 'CookingGame/Build/v10 webgl (final build).framework.js',
    codeUrl: 'CookingGame/Build/v10 webgl (final build).wasm',
  });
  */

  // did i write this right?
  const [game, setGame] = useState(undefined);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    console.log('render');
    const url = `${API_URL}/api/v1/game/${id}`;
    console.log('url', url);
    axios.get(url).then((res) => {
      console.log('game info:', res.data);
      setGame(res.data.game);
    });
  }, [id]);

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio,
  );

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

  const navigate = useNavigate();

  function navigateLanding() {
    navigate('/');
  }

  return (<div className={styles.center}>
    <span className={styles.section}>
      <h1 className={styles.text}>
      Cooking with ONE!
      </h1>
      <button className={styles.button} onClick={navigateLanding}>Log Out</button>
    </span>
    {
      game && <UnityWrapper loaderUrl={game.unityLoaderUrl}
      dataUrl={game.unityDataUrl}
      frameworkUrl={game.unityFrameworkUrl} codeUrl={game.unityCodeUrl} />
    }
  </div>);
}
export default GameLoadedPage;
