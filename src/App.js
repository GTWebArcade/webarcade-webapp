/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './component/landing';
import SignUpPage from './component/sign-up';
import GameViewPage from './component/game-view';
import CreateGamePage from './component/create-game';
import GameLoadedPage from './component/game-loaded';
import GamesPage from './component/games';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={ <LandingPage/> } />
        <Route path="sign-up" element={ <SignUpPage/> } />
        <Route path="game-view" element={ <GameViewPage/> } />
        <Route path="create-game" element={ <CreateGamePage/> } />
        <Route path="game-loaded" element={ <GameLoadedPage/> } />
        <Route path="games" element={ <GamesPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
