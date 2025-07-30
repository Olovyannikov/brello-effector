import { createEvent, createStore } from 'effector';
import { nanoid } from 'nanoid';

import { atom } from '@/shared/factories';

import { INITIAL_BOARD } from '../const';
import { cardMove, listReorder } from '../lib';
import type { KanbanBoard, KanbanCardForm } from '../types';

export const KanbanModel = atom(() => {
    const cardCreateClicked = createEvent<{ card: KanbanCardForm; columnId: string }>();

    const cardEditClicked = createEvent<{ columnId: string; cardId: string; card: KanbanCardForm }>();
    const cardDeleteClicked = createEvent<{ columnId: string; cardId: string }>();
    const cardMoved = createEvent<{
        fromColumnId: string;
        toColumnId: string;
        fromIndex: number;
        toIndex: number;
    }>();
    const cardMovedInTheColumn = cardMoved.filter({
        fn: ({ fromColumnId, toColumnId }) => fromColumnId === toColumnId,
    });
    const cardMovedToAnotherColumn = cardMoved.filter({
        fn: ({ fromColumnId, toColumnId }) => fromColumnId !== toColumnId,
    });

    const $board = createStore<KanbanBoard>(INITIAL_BOARD);
    $board.on(cardMovedInTheColumn, (board, { fromColumnId, fromIndex, toIndex }) => {
        const updatedBoard = board.map((column) => {
            if (column.id === fromColumnId) {
                const updatedList = listReorder(column, fromIndex, toIndex);
                return updatedList;
            }

            return column;
        });

        return updatedBoard;
    });

    $board.on(cardMovedToAnotherColumn, (board, { fromColumnId, toColumnId, fromIndex, toIndex }) => {
        return cardMove(board, fromColumnId, toColumnId, fromIndex, toIndex);
    });

    $board.on(cardCreateClicked, (board, { card, columnId }) => {
        return board.map((column) => {
            if (column.id === columnId) {
                // Generate ID right in the model
                const newCard = { ...card, id: nanoid() };
                return { ...column, cards: [...column.cards, newCard] };
            }

            return column;
        });
    });

    return {
        $board,
        cardCreateClicked,
        cardEditClicked,
        cardDeleteClicked,
        cardMoved,
        cardMovedInTheColumn,
        cardMovedToAnotherColumn,
    };
});
