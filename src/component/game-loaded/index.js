import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Unity, useUnityContext } from 'react-unity-webgl';

function GameLoadedPage() {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'build/v10 webgl (final build).loader.js',
    dataUrl: 'build/v10 webgl (final build).data',
    frameworkUrl: 'build/v10 webgl (final build).framework.js',
    codeUrl: 'build/v10 webgl (final build).wasm',
  });

  return <Unity unityProvider={unityProvider} />;
}
export default GameLoadedPage;
