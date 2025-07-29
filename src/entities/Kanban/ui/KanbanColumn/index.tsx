import type { PropsWithChildren } from 'react';

import { Droppable } from '@hello-pangea/dnd';
import { Box, Paper, Stack, Title } from '@mantine/core';
import { type ReactNode } from '@tabler/icons-react';

import { KanbanCard } from '@/entities/Kanban';

import type { KanbanCardEntity, KanbanList } from '../../types';

interface KanbanColumnProps {
    title: string;
    id: string;
    onUpdate: (updatedList: KanbanList) => void;
    actionSlot?: ReactNode;
    cards: KanbanCardEntity[];
}

export function KanbanColumn({ title, actionSlot, id, cards, onUpdate }: PropsWithChildren<KanbanColumnProps>) {
    function onCardEdit(updatedCard: KanbanCardEntity) {
        const updatedCards = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));
        onUpdate({ id, title, cards: updatedCards });
    }

    function onCardDelete(cardId: string) {
        const updatedCards = cards.filter((card) => card.id !== cardId);
        onUpdate({ id, title, cards: updatedCards });
    }

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
                                {cards.map((card, idx) => (
                                    <KanbanCard
                                        onEdit={onCardEdit}
                                        onDelete={() => onCardDelete(card.id)}
                                        key={card.id}
                                        index={idx}
                                        {...card}
                                    />
                                ))}
                            </Stack>
                            {actionSlot}
                        </Stack>
                    </Paper>
                </Box>
            )}
        </Droppable>
    );
}
