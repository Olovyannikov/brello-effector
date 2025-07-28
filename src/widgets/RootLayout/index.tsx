import type { PropsWithChildren } from 'react';

import { Header } from './ui/Header';

export const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};
