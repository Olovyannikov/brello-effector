import { Button, type MantineColor } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface AddKanbanCardActionProps {
    color: MantineColor;
}

export const AddKanbanCardAction = ({ color }: AddKanbanCardActionProps) => {
    return (
        <Button fullWidth color={color.split('.').shift()} variant='light' mt='sm' leftSection={<IconPlus size={14} />}>
            Add card
        </Button>
    );
};
