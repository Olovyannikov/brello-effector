export interface KanbanList {
    id: string;
    title: string;
    cards: KanbanCard[];
}

export interface KanbanCardEntity {
    id: string;
    title: string;
}

export type KanbanBoard = KanbanList[];
