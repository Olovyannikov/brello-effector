import { useState } from 'react';

import { Draggable } from '@hello-pangea/dnd';
import { ActionIcon, Box, Group, Paper, Text, Textarea } from '@mantine/core';
import { IconCheck, IconPencil, IconTrash, IconX } from '@tabler/icons-react';

import type { KanbanCardEntity } from '../../types';

interface KanbanCardProps {
    id: string;
    index: number;
    title: string;
    onEdit: (card: KanbanCardEntity) => void;
    onDelete: () => void;
}

export function KanbanCard({ id, index, title, onDelete, onEdit }: KanbanCardProps) {
    const [editTitle, setEditTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);

    function onReset() {
        setEditTitle(title);
        setEditMode(false);
    }

    function onEditFinished() {
        onEdit({ id, title: editTitle });
        onReset();
    }

    if (editMode) {
        return (
            <Box>
                <Textarea variant='md' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <Group>
                    <ActionIcon onClick={onEditFinished}>
                        <IconCheck size={14} />
                    </ActionIcon>
                    <ActionIcon onClick={onReset}>
                        <IconX size={14} />
                    </ActionIcon>
                </Group>
            </Box>
        );
    }

    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Paper radius='md' withBorder p='md'>
                        <Text mb='lg'>{title ?? 'New Card'}</Text>
                        <Group>
                            <ActionIcon variant='transparent' onClick={() => setEditMode(true)}>
                                <IconPencil size={14} />
                            </ActionIcon>
                            <ActionIcon variant='transparent' onClick={() => onDelete()}>
                                <IconTrash size={14} />
                            </ActionIcon>
                        </Group>
                    </Paper>
                </Box>
            )}
        </Draggable>
    );
}
