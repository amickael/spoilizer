import React from 'react';
import { Stack, Button, Text, Link, Icon, useColorMode } from '@chakra-ui/core';

const Footer = () => {
    const { toggleColorMode } = useColorMode();

    return (
        <Stack
            paddingY={3}
            align="center"
            justify="flex-end"
            width="100%"
            height="100%"
        >
            <Button
                size="sm"
                aria-label="toggle-theme"
                onClick={toggleColorMode}
            >
                <i className="fas fa-adjust" />
            </Button>
            <Stack isInline>
                <Link
                    fontSize="sm"
                    isExternal
                    href="https://github.com/amickael/spoilizer/issues/new?template=bug_report.md"
                >
                    Report a bug <Icon name="external-link" />
                </Link>
                <Text fontSize="sm">&bull;</Text>
                <Link
                    fontSize="sm"
                    isExternal
                    href="https://github.com/amickael/spoilizer/issues/new?template=feature_request.md"
                >
                    Request a feature <Icon name="external-link" />
                </Link>
            </Stack>
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
