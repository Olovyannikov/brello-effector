import { createEffect, createEvent, createStore, sample } from 'effector';
import { nanoid } from 'nanoid';

import { atom } from '@/shared/factories';
import { appStarted } from '@/shared/services';

import { type CardUpdate, cardsCreateFx, cardsLoadFx, cardsUpdateFx, listsCreateFx, listsLoadFx } from '../api';
import { cardMove, listReorder, orderBetween } from '../lib';
import type { KanbanBoard, KanbanCardEntity, KanbanCardForm } from '../types';

export const KanbanModel = atom(() => {
    const cardEditFx = createEffect(async ({ cardId, card }: { cardId: string; card: Partial<CardUpdate> }) => {
        return await cardsUpdateFx({ ...card, id: cardId });
    });

    const $board = createStore<KanbanBoard>([]);

    const cardCreateClicked = createEvent<{ card: KanbanCardForm; listId: string }>();

    const cardEditClicked = createEvent<{ columnId: string; cardId: string; card: KanbanCardForm }>();
    const cardDeleteClicked = createEvent<{ columnId: string; cardId: string }>();
    const cardMoved = createEvent<{
        fromListId: string;
        toListId: string;
        fromIndex: number;
        toIndex: number;
        cardId: string;
    }>();
    const cardMovedWithOrder = createEvent<{
        cardId: string;
        toListId: string;
        toIndex: number;
        fromListId: string;
        fromIndex: number;
        sortOrder: number;
    }>();

    sample({
        clock: cardMoved,
        source: $board,
        fn: (board, { cardId, toListId, toIndex, ...rest }) => {
            const targetList = board.find((list) => list.id === toListId);
            const sortOrder = orderBetween(targetList?.cards[toIndex - 1], targetList?.cards[toIndex]);

            return { cardId, toListId, toIndex, sortOrder, ...rest };
        },
        target: cardMovedWithOrder,
    });

    sample({
        clock: cardMovedWithOrder,
        fn: ({ cardId, toListId, sortOrder }) => ({ cardId, card: { list_id: toListId, sort_order: sortOrder } }),
        target: cardEditFx,
    });

    const cardMovedInTheList = cardMovedWithOrder.filter({
        fn: ({ fromListId, toListId }) => fromListId === toListId,
    });
    const cardMovedToAnotherList = cardMovedWithOrder.filter({
        fn: ({ fromListId, toListId }) => fromListId !== toListId,
    });

    $board.on(cardMovedInTheList, (board, { fromListId, fromIndex, toIndex }) =>
        board.map((list) => (list.id === fromListId ? listReorder(list, fromIndex, toIndex) : list)),
    );

    sample({
        clock: cardMovedToAnotherList,
        fn: ({ cardId, toListId }) => ({ cardId, card: { list_id: toListId } }),
        target: cardEditFx,
    });

    $board.on(cardMovedToAnotherList, (board, { fromListId, toListId, fromIndex, toIndex }) => {
        return cardMove(board, fromListId, toListId, fromIndex, toIndex);
    });

    const cardCreated = createEvent<{ card: KanbanCardEntity; listId: string }>();

    sample({
        clock: cardCreateClicked,
        source: $board,
        fn: (board, { card, listId }) => {
            const targetList = board.find((list) => list.id === listId);

            let sortOrder = 10_000;
            if (targetList && targetList.cards.length > 0) {
                const maxSortOrder = Math.max(...targetList.cards.map((card) => card.sort_order));
                sortOrder = maxSortOrder + 1000;
            }

            return { card: { ...card, id: nanoid(), sort_order: sortOrder }, listId };
        },
        target: cardCreated,
    });

    $board.on(cardCreated, (board, { card, listId }) => {
        return board.map((list) => {
            if (list.id === listId) {
                return { ...list, cards: [...list.cards, card] };
            }

            return list;
        });
    });

    const boardLoadFx = createEffect(async () => {
        const [lists, cards] = await Promise.all([listsLoadFx(), cardsLoadFx()]);
        return lists.map((list) => ({
            ...list,
            cards: cards.filter((card) => card.list_id === list.id),
        }));
    });

    const boardInitializeFx = createEffect(async () => {
        const lists = await Promise.all([
            listsCreateFx({ title: 'To Do', sort_order: 1000 }),
            listsCreateFx({ title: 'In Progress', sort_order: 2000 }),
            listsCreateFx({ title: 'Done', sort_order: 3000 }),
        ]);
        return lists.filter((list) => list !== null);
    });

    sample({
        clock: appStarted,
        target: [boardLoadFx],
    });

    sample({
        clock: boardLoadFx.doneData,
        source: $board,
        filter: (board) => board.length === 0,
        target: boardInitializeFx,
    });

    $board.on(boardLoadFx.doneData, (_, board) => board);
    $board.on(boardInitializeFx.doneData, (_, board) => board.map((list) => ({ ...list, cards: [] })));

    const cardSaveFx = createEffect(
        async ({ card: { id: _, ...card }, listId }: { card: KanbanCardEntity; listId: string }) => {
            return await cardsCreateFx({ ...card, list_id: listId });
        },
    );

    sample({
        clock: cardCreated,
        target: cardSaveFx,
    });

    const cardSavedSuccess = createEvent<{ originalId: string; card: KanbanCardEntity; listId: string }>();

    sample({
        clock: cardSaveFx.done,
        filter: ({ result }) => result !== null,
        fn: ({ params, result: card }) => ({
            originalId: params.card.id,
            card: card!,
            listId: params.listId,
        }),
        target: cardSavedSuccess,
    });

    const cardSavedError = createEvent<{ originalId: string; listId: string }>();

    sample({
        clock: [cardSaveFx.fail, cardSaveFx.done.filter({ fn: ({ result }) => result === null })],
        fn: ({ params }) => ({ originalId: params.card.id, listId: params.listId }),
        target: cardSavedError,
    });

    $board.on(cardSavedSuccess, (board, { originalId, card, listId }) => {
        return board.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.map((found) => (found.id === originalId ? card : found)),
                };
            }

            return list;
        });
    });

    $board.on(cardSavedError, (board, { originalId, listId }) => {
        return board.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.filter((found) => found.id !== originalId),
                };
            }

            return list;
        });
    });

    return {
        $board,
        cardCreateClicked,
        cardEditClicked,
        cardDeleteClicked,
        cardMovedWithOrder,
        cardMovedInTheColumn: cardMovedInTheList,
        cardMovedToAnotherColumn: cardMovedToAnotherList,
        cardMoved,
    };
});
