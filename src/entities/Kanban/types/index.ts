export interface KanbanCardEntity {
    id: string;
    title: string;
}
export interface KanbanList {
    id: string;
    title: string;
    cards: KanbanCardEntity[];
}

export type KanbanBoard = KanbanList[];
export type KanbanCardForm = Pick<KanbanCardEntity, 'title'>;
