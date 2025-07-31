import { DragDropContext, type OnDragEndResponder } from '@hello-pangea/dnd';
import { Grid } from '@mantine/core';
import { useUnit } from 'effector-react';

import { KanbanColumn, KanbanModel } from '@/entities/Kanban';

import { KanbanCreateCard } from '@/features/AddKanbanCardAction';

import { KanbanCard } from '@/widgets/KanbanCard';

export const KanbanBoard = () => {
    const [board, onCardMove] = useUnit([KanbanModel.$board, KanbanModel.cardMoved]);

    const onDragEnd: OnDragEndResponder = ({ source, destination, draggableId }) => {
        if (!destination) {
            // Dropped outside of a column
            return;
        }

        const fromListId = source.droppableId;
        const toListId = destination.droppableId;
        const fromIndex = source.index;
        const toIndex = destination.index;
        const cardId = draggableId;

        onCardMove({ fromListId, toListId, fromIndex, toIndex, cardId });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid grow gutter='md'>
                {board.map((column) => (
                    <Grid.Col key={column.id} span={4}>
                        <KanbanColumn
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            cardsSlot={column.cards.map((card, idx) => (
                                <KanbanCard key={card.id} index={idx} columnId={column.id} {...card} />
                            ))}
                            actionSlot={<KanbanCreateCard columnId={column.id} />}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </DragDropContext>
    );
};
