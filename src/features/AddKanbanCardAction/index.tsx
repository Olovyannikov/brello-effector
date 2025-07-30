import { type FormEvent, useState } from 'react';

import { Button, Textarea } from '@mantine/core';
import { useUnit } from 'effector-react';

import { KanbanModel } from '@/entities/Kanban';

export function KanbanCreateCard({ columnId }: { columnId: string }) {
    const [onCreateCard] = useUnit([KanbanModel.cardCreateClicked]);

    const [title, setTitle] = useState('');

    function onReset() {
        setTitle('');
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault();

        onCreateCard({ columnId, card: { title } });
        onReset();
    }

    return (
        <form onSubmit={onSubmit}>
            <Textarea
                mb='md'
                radius='md'
                bg='white'
                variant='md'
                rows={3}
                style={{
                    borderRadius: 16,
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Start making new card here'
            />
            <Button type='submit'>Add card</Button>
        </form>
    );
}
