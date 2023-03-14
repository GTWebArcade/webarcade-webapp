import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Unity, useUnityContext } from 'react-unity-webgl';

function GameLoadedPage() {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'CookingGame/Build/v10 webgl (final build).loader.js',
    dataUrl: 'CookingGame/Build/v10 webgl (final build).data',
    frameworkUrl: 'CookingGame/Build/v10 webgl (final build).framework.js',
    codeUrl: 'CookingGame/Build/v10 webgl (final build).wasm',
  });

  return (<div>
    Hello world
    <Unity unityProvider={unityProvider} />
  </div>);
}
export default GameLoadedPage;
