import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Suspense, useContext, useState } from 'react';
import { AboutAsync } from './pages/about/About.async';
import { MyPageAsync } from './pages/mypage/MyPage.async';
import { useTheme } from './theme/useTheme';
import './styles/index.scss';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>toogle</button>
      <Link to="/"> Mypage</Link>
      <Link to="about"> About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AboutAsync />} />
          <Route path="/about" element={<MyPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
