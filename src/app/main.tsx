import {createRoot} from 'react-dom/client'
import './styles/styles.css';
import {ThemeProvider} from "./providers";

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
    <ThemeProvider>
        Hello world
    </ThemeProvider>,
)
