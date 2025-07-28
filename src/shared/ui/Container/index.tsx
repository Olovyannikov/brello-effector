import type { PropsWithChildren } from 'react';

import { Container as MantineContainer } from '@mantine/core';

import s from './Container.module.css';

export const Container = ({ children }: PropsWithChildren) => {
    return <MantineContainer className={s.root}>{children}</MantineContainer>;
};
