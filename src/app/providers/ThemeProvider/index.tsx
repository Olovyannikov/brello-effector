import type { PropsWithChildren } from 'react';

import { MantineProvider } from '@mantine/core';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return <MantineProvider>{children}</MantineProvider>;
};
