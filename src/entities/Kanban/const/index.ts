import { nanoid } from 'nanoid';

import type { KanbanList } from '../types';

export const INITIAL_BOARD: KanbanList[] = [
    {
        id: nanoid(),
        title: 'To Do',
        cards: [
            { id: nanoid(), title: 'Setup the Workplace' },
            { id: nanoid(), title: 'Review opened issues' },
        ],
    },
    {
        id: nanoid(),
        title: 'In Progress',
        cards: [{ id: nanoid(), title: 'Implement Kanban feature' }],
    },
    {
        id: nanoid(),
        title: 'Done',
        cards: [{ id: nanoid(), title: 'Initialized project' }],
    },
];
