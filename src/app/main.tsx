import { createRoot } from 'react-dom/client';

import { ThemeProvider } from './providers';
import './styles/styles.css';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<ThemeProvider>Hello world 2</ThemeProvider>);
