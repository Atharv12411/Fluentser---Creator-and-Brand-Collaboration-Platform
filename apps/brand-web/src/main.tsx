import React from 'react'; import { createRoot } from 'react-dom/client'; import App from './App'; import CreatorApp from './CreatorApp'; import './styles.css'; import './creator.css';
const Screen = window.location.pathname.startsWith('/brand') ? App : CreatorApp;
createRoot(document.getElementById('root')!).render(<React.StrictMode><Screen/></React.StrictMode>);
