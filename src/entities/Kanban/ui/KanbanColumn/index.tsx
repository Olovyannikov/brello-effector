import { type PropsWithChildren } from 'react';

import { Droppable } from '@hello-pangea/dnd';
import { Box, Paper, Stack, Title } from '@mantine/core';
import { type ReactNode } from '@tabler/icons-react';

interface KanbanColumnProps {
    title: string;
    id: string;
    actionSlot?: ReactNode;
    cardsSlot: ReactNode;
}

export function KanbanColumn({ title, actionSlot, id, cardsSlot }: PropsWithChildren<KanbanColumnProps>) {
    return (
        <Droppable key={id} droppableId={id}>
            {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                    <Paper bg='gray.0' p='md' radius='md'>
                        <Title order={4} mb='md'>
                            {title}
                        </Title>
                        <Stack gap='xs'>
                            <Stack mah={700} style={{ overflow: 'auto' }}>
                                {cardsSlot}
                            </Stack>
                            {actionSlot}
                        </Stack>
                    </Paper>
                </Box>
            )}
        </Droppable>
    );
}
