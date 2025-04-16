import './globals.css';
import './fonts.css';

import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback';
import { FC } from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import { Toaster } from 'sonner';
import { store } from './store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          duration: 5000,
          className: '!left-auto !right-[0px] !top-[40px]',
        }}
      />
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
