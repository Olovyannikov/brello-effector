import { describe, expect, it } from 'vitest';

import { cardMove } from '..';
import type { KanbanBoard } from '../../types';

describe('cardMove', () => {
    const initialBoard: KanbanBoard = [
        {
            id: 'todo',
            title: 'To Do',
            cards: [
                { id: 'task1', title: 'Task 1' },
                { id: 'task2', title: 'Task 2' },
            ],
        },
        {
            id: 'doing',
            title: 'Doing',
            cards: [{ id: 'task3', title: 'Task 3' }],
        },
        {
            id: 'done',
            title: 'Done',
            cards: [],
        },
    ];

    it('перемещает карту внутри одной колонки', () => {
        const result = cardMove(initialBoard, 'todo', 'todo', 0, 1);

        // Проверяем исходную колонку
        expect(result[0].cards).toEqual([{ id: 'task2', title: 'Task 2' }]);
        // Проверяем, что другие колонки не изменились
        expect(result[1]).toEqual(initialBoard[1]);
        expect(result[2]).toEqual(initialBoard[2]);
    });

    it('перемещает карту между колонками', () => {
        const result = cardMove(initialBoard, 'todo', 'doing', 0, 1);

        // Исходная колонка (todo) без первой карты
        expect(result[0].cards).toEqual([{ id: 'task2', title: 'Task 2' }]);
        // Колонка назначения (doing) с новой картой в конце
        expect(result[1].cards).toEqual([
            { id: 'task3', title: 'Task 3' },
            { id: 'task1', title: 'Task 1' },
        ]);
        // Пустая колонка осталась без изменений
        expect(result[2]).toEqual(initialBoard[2]);
    });

    it('перемещает карту в пустую колонку', () => {
        const result = cardMove(initialBoard, 'todo', 'done', 0, 0);

        expect(result[0].cards).toEqual([{ id: 'task2', title: 'Task 2' }]);
        expect(result[2].cards).toEqual([{ id: 'task1', title: 'Task 1' }]);
    });

    it('корректно обрабатывает toIndex вне границ (в конец списка)', () => {
        const result = cardMove(initialBoard, 'todo', 'done', 0, 999);
        expect(result[2].cards).toEqual([{ id: 'task1', title: 'Task 1' }]);
    });
});
