import { Route, Routes, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { About } from 'pages/about';
import { Main } from 'pages/main/';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>toogle</button>
      <Link to="/"> Mypage</Link>
      <Link to="about"> About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<Main />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
