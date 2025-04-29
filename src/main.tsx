
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Scroll to top on page load/reload
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

window.onload = () => {
  window.scrollTo(0, 0);
};

createRoot(document.getElementById("root")!).render(<App />);
