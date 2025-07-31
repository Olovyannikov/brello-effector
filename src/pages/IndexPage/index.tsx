import { Box, Text, Textarea } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';

import { Container } from '@/shared/ui';

import { KanbanBoard } from '@/widgets/KanbanBoard';
import { RootLayout } from '@/widgets/RootLayout';

import { TestModel } from './model.ts';

export function IndexPage() {
    useGate(TestModel.TestModelGate);
    const [opened, supported] = useUnit([TestModel.$opened, TestModel.$supported]);
    return (
        <RootLayout>
            <Box component='section'>
                <Container>
                    <Textarea
                        styles={{
                            input: {
                                fontSize: '16px',
                            },
                        }}
                        placeholder='show'
                    />
                    <Text>Feature is {supported ? 'supported' : 'not supported'}</Text>
                    <Text>The keyboard is {opened ? 'visible' : 'hidden'}</Text>
                    <KanbanBoard />
                </Container>
            </Box>
        </RootLayout>
    );
}
