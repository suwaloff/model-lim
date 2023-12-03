import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Suspense } from 'react';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{element}</div>
              </Suspense>
            }
          />
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
