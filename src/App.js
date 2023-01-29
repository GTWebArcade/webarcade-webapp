import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './component/landing';
import SignInPage from './component/sign-in';
import SignUpPage from './component/sign-up';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="sign-in" element={ <SignInPage/> } />
        <Route path="sign-up" element={ <SignUpPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
