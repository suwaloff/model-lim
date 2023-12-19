import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { NavBar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useState } from 'react';
import 'app/styles/index.scss';
import { Modal } from 'shared/ui/modal/Modal';

const App = () => {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  // Crutch test error boundary =)

  // useEffect(() => {
  //   if (Math.random() < 0.5) {
  //     throw new Error();
  //   }
  // }, []);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nihil veniam ducimus
          eligendi reiciendis asperiores aliquid quidem deserunt ipsam quos eveniet, provident
          architecto, consequuntur libero! Placeat laborum temporibus exercitationem ea.
        </Modal>
        <button onClick={() => setIsOpen(true)}>open</button>
        <NavBar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
