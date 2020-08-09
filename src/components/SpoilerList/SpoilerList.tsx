import React, { useState, useEffect } from 'react';
import { Spoiler } from '../Spoiler';
import {
    Grid,
    Input,
    InputGroup,
    Flex,
    InputLeftElement,
    Icon,
    Heading,
} from '@chakra-ui/core';
import { Spoiler as ISpoiler } from '../../types/spoilerLog';

interface SpoilerListProps {
    title?: string;
    spoilerList: ISpoiler[];
    hideSearch?: boolean;
}

const SpoilerList = ({
    title = 'Spoilers',
    spoilerList,
    hideSearch = false,
}: SpoilerListProps) => {
    const [data, setData] = useState<ISpoiler[]>([...spoilerList]),
        [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText === '') {
            setData([...spoilerList]);
        } else {
            setData(
                [...spoilerList].filter((spoiler) =>
                    spoiler.item.item
                        .toLowerCase()
                        .startsWith(searchText.toLowerCase())
                )
            );
        }
    }, [searchText, spoilerList]);

    return (
        <Flex direction="column" width="100%">
            <Flex
                marginBottom="1em"
                width="100%"
                justify="space-between"
                align="center"
            >
                <Heading size="lg">{title}</Heading>
                {!hideSearch && (
                    <InputGroup width="35%">
                        <InputLeftElement children={<Icon name="search" />} />
                        <Input
                            value={searchText}
                            placeholder="Search items"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setSearchText(event.target.value)}
                        />
                    </InputGroup>
                )}
            </Flex>
            <Grid
                templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                gap={2}
            >
                {data.map((spoiler, i) => (
                    <Spoiler key={i} spoiler={spoiler} />
                ))}
            </Grid>
        </Flex>
    );
};

export { SpoilerList };
