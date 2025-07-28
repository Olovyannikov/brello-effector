import { Box } from '@mantine/core';

import { Container } from '../../shared/ui';
import { KanbanBoard } from '../../widgets/KanbanBoard';
import { RootLayout } from '../../widgets/RootLayout';

export function IndexPage() {
    return (
        <RootLayout>
            <Box component='section'>
                <Container>
                    <KanbanBoard />
                </Container>
            </Box>
        </RootLayout>
    );
}
