import { Avatar, Box, Burger, Button, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconStack, IconUserCircle } from '@tabler/icons-react';

import s from './Header.module.css';

const links = [
    { link: '/boards', label: 'Boards', icon: <IconStack /> },
    { link: '/members', label: 'Members', icon: <IconUserCircle /> },
];

const items = links.map(({ link, label, icon }) => (
    <Button c='black' leftSection={icon} variant='white' component='a' key={label} href={link} className={s.link}>
        {label}
    </Button>
));

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Box component='header' className={s.header}>
            <Group align='center' mih={72} justify='space-between'>
                <Group gap={0}>
                    <Group>
                        <Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
                        <Image w={142} h={32} src='/logo.svg' />
                    </Group>
                    <Group gap={5} className={s.links} visibleFrom='sm'>
                        {items}
                    </Group>
                </Group>
                <Group>
                    <Button size='md' variant='transparent'>
                        <Avatar />
                    </Button>
                </Group>
            </Group>
        </Box>
    );
}
