import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './component/landing';
import SignUpPage from './component/sign-up';
import GameViewPage from './component/game-view';
import GameLoadedPage from './component/game-loaded';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={ <LandingPage/> } />
        <Route path="sign-up" element={ <SignUpPage/> } />
        <Route path="game-view" element={ <GameViewPage/> } />
        <Route path="game-loaded" element={ <GameLoadedPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
