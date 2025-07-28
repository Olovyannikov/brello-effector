import type { PropsWithChildren } from 'react';

import { type MantineColor, Paper, Stack, Title } from '@mantine/core';
import { type ReactNode } from '@tabler/icons-react';

interface KanbanColumnProps {
    title: string;
    color: MantineColor;
    actionSlot?: ReactNode;
}

export function KanbanColumn({ title, color, actionSlot, children }: PropsWithChildren<KanbanColumnProps>) {
    return (
        <Paper p='md' bg={color} radius='md'>
            <Title order={4} mb='md'>
                {title}
            </Title>
            <Stack gap='xs'>
                {children}
                {actionSlot}
            </Stack>
        </Paper>
    );
}
