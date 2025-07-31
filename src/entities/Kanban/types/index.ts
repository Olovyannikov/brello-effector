export interface KanbanCardEntity {
    id: string;
    title: string;
    sort_order: number;
}
export interface KanbanList {
    id: string;
    title: string;
    sort_order: number;
    cards: KanbanCardEntity[];
}

export type KanbanBoard = KanbanList[];
export type KanbanCardForm = Pick<KanbanCardEntity, 'title'>;
