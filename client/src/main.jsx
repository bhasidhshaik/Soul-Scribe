import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';

const CLIENT_ID = '43725248788-3s0ucn81bijrlds18tbbtaq08ep94gd7.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
    </UserProvider>
  </StrictMode>,
)
