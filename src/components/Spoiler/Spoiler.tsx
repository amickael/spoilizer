import React from 'react';
import {
    Stack,
    Badge,
    Text,
    Tooltip,
    Heading,
    useColorMode,
} from '@chakra-ui/core';
import { Spoiler as ISpoiler } from '../../types/spoilerLog';

interface SpoilerProps {
    spoiler: ISpoiler;
}

const Spoiler = ({ spoiler }: SpoilerProps) => {
    const { colorMode } = useColorMode(),
        bgColor = { dark: 'gray.900', light: 'gray.100' },
        borderColor = { dark: 'gray.600', light: 'gray.100' };

    return (
        <Stack
            spacing="0.25em"
            bg={bgColor[colorMode]}
            padding="0.5em"
            borderRadius={5}
            borderColor={borderColor[colorMode]}
            borderWidth={1}
        >
            <Text>{spoiler.location}</Text>
            <Heading size="md">{spoiler.item.item}</Heading>
            <Stack isInline>
                {!!spoiler.item.price && (
                    <Tooltip
                        label="Item price"
                        aria-label="price-tooltip"
                        placement="top"
                        hasArrow
                    >
                        <Badge variantColor="green">
                            <i className="fas fa-gem" />
                            &nbsp;{spoiler.item.price}
                        </Badge>
                    </Tooltip>
                )}
                {!!spoiler.item.model && (
                    <Tooltip
                        label="Visual model"
                        aria-label="model-tooltip"
                        placement="top"
                        hasArrow
                    >
                        <Badge variantColor="red">
                            <i className="fas fa-draw-polygon" />
                            &nbsp;{spoiler.item.model}
                        </Badge>
                    </Tooltip>
                )}
            </Stack>
        </Stack>
    );
};

export { Spoiler };
