import { Grid, Group, Stack, Text } from '@mantine/core';

import { KanbanCard, KanbanColumn } from '../../entities/Kanban';
import { AddKanbanCardAction } from '../../features/AddKanbanCardAction';

export const KanbanBoard = () => {
    return (
        <Stack>
            <Group w='100%'>
                <Text>Board</Text>
            </Group>
            <Grid grow gutter='md'>
                <Grid.Col span={4}>
                    <KanbanColumn
                        children={<KanbanCard />}
                        actionSlot={<AddKanbanCardAction color='teal' />}
                        title='To Do'
                        color='teal.1'
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <KanbanColumn
                        children={<KanbanCard />}
                        actionSlot={<AddKanbanCardAction color='grape' />}
                        title='In Progress'
                        color='grape.1'
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <KanbanColumn
                        children={<KanbanCard />}
                        actionSlot={<AddKanbanCardAction color='gray' />}
                        title='Done'
                        color='gray.1'
                    />
                </Grid.Col>
            </Grid>
        </Stack>
    );
};
