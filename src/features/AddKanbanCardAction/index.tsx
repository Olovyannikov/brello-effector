import { useState } from 'react';

import { Button, Textarea } from '@mantine/core';
import { nanoid } from 'nanoid';

import type { KanbanCardEntity } from '@/entities/Kanban';

export function KanbanCreateCard({ onCreate }: { onCreate: (card: KanbanCardEntity) => void }) {
    const [title, setTitle] = useState('');

    function onReset() {
        setTitle('');
    }

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        onCreate({ id: nanoid(), title });
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
