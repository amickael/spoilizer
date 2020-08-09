import React from 'react';
import { Stack, Button, Text, Link, useColorMode } from '@chakra-ui/core';

const Footer = () => {
    const { toggleColorMode } = useColorMode();

    return (
        <Stack
            paddingY="1em"
            align="center"
            justify="flex-end"
            width="100%"
            height="100%"
        >
            <Button size="sm" onClick={toggleColorMode}>
                <i className="fas fa-adjust" />
            </Button>
            <Stack isInline>
                <Text fontSize="sm">&copy; 2020 Andrew Mickael</Text>
                <Text fontSize="sm">&bull;</Text>
                <Link
                    fontSize="sm"
                    isExternal
                    href="https://github.com/amickael/spoilizer"
                >
                    <i className="fab fa-github" /> GitHub
                </Link>
            </Stack>
        </Stack>
    );
};

export { Footer };
