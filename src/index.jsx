import './i18n';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
