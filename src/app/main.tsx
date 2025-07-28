import { createRoot } from 'react-dom/client';

import { IndexPage } from '../pages/IndexPage';
import { ThemeProvider } from './providers';
import './styles/styles.css';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <ThemeProvider>
        <IndexPage />
    </ThemeProvider>,
);
