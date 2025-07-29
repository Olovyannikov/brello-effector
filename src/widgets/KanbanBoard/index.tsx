import { useState } from 'react';

import { DragDropContext, type OnDragEndResponder } from '@hello-pangea/dnd';
import { Grid } from '@mantine/core';

import { INITIAL_BOARD, KanbanColumn, cardMove, listReorder } from '@/entities/Kanban';
import type { KanbanCardEntity, KanbanList } from '@/entities/Kanban/types';

import { KanbanCreateCard } from '@/features/AddKanbanCardAction';

export const KanbanBoard = () => {
    const [board, setBoard] = useState(INITIAL_BOARD);

    const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
        if (!destination) {
            // Dropped outside of a column
            return;
        }

        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;

        const insideTheSameColumn = sourceId === destinationId;
        if (insideTheSameColumn) {
            const column = board.find((column) => column.id === sourceId);
            if (column) {
                const reorderedList = listReorder(column, source.index, destination.index);
                const updatedBoard = board.map((item) => (item.id === sourceId ? reorderedList : item));
                setBoard(updatedBoard);
            }
        } else {
            const updatedBoard = cardMove(board, sourceId, destinationId, source.index, destination.index);
            setBoard(updatedBoard);
        }
    };

    function onCreateCard(card: KanbanCardEntity, columnId: string) {
        const updatedBoard = board.map((column) => {
            if (column.id === columnId) {
                return { ...column, cards: [...column.cards, card] };
            }

            return column;
        });

        setBoard(updatedBoard);
    }

    function onColumnUpdate(updatedList: KanbanList) {
        const updatedBoard = board.map((column) => (column.id === updatedList.id ? updatedList : column));
        setBoard(updatedBoard);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid grow gutter='md'>
                {board.map((column) => (
                    <Grid.Col span={4}>
                        <KanbanColumn
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            cards={column.cards}
                            actionSlot={<KanbanCreateCard onCreate={(card) => onCreateCard(card, column.id)} />}
                            onUpdate={onColumnUpdate}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </DragDropContext>
    );
};
