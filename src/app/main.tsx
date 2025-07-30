import { createRoot } from 'react-dom/client';

// TODO: remove
import '@/shared/api';

import { listsLoadFx } from '@/entities/Kanban';

import { IndexPage } from '@/pages/IndexPage';

import { ThemeProvider } from './providers';
import './styles/styles.css';

listsLoadFx();

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <ThemeProvider>
        <IndexPage />
    </ThemeProvider>,
);
