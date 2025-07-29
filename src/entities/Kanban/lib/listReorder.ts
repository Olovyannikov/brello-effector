import type { KanbanList } from '../types';

export function listReorder(list: KanbanList, startIndex: number, endIndex: number): KanbanList {
    const cards = Array.from(list.cards);
    const [removed] = cards.splice(startIndex, 1);
    cards.splice(endIndex, 0, removed);

    return { ...list, cards };
}
