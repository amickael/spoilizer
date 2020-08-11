import React, { useState, useMemo } from 'react';
import { Item } from '../Item';
import {
    Grid,
    Input,
    InputGroup,
    Flex,
    InputLeftElement,
    Icon,
    Heading,
    InputRightElement,
    IconButton,
} from '@chakra-ui/core';
import { Item as ISpoiler } from '../../types/spoilerLog';
import Fuse from 'fuse.js';

interface SpoilerListProps {
    title?: string;
    spoilerList: ISpoiler[];
    hideSearch?: boolean;
}

const MemoSpoiler = React.memo(Item);
const ItemList = ({
    title = 'Spoilers',
    spoilerList,
    hideSearch = false,
}: SpoilerListProps) => {
    const [query, setQuery] = useState(''),
        fuse = useMemo(
            () =>
                new Fuse(spoilerList, { keys: ['item.item'], threshold: 0.25 }),
            [spoilerList]
        ),
        searchResult = useMemo(
            () => fuse.search(query).map((result) => result.item),
            [fuse, query]
        );

    const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

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
                            value={query}
                            placeholder="Search items"
                            onChange={handleQuery}
                            aria-label="search-items"
                        />
                        <InputRightElement
                            children={
                                <IconButton
                                    aria-label="clear-search"
                                    onClick={() => setQuery('')}
                                    icon="small-close"
                                    size="xs"
                                    isRound
                                    hidden={!query}
                                    children={undefined}
                                />
                            }
                        />
                    </InputGroup>
                )}
            </Flex>
            <Grid
                templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                gap={2}
            >
                {(query ? searchResult : spoilerList).map((spoiler) => (
                    <MemoSpoiler
                        key={`${spoiler.location}${spoiler.item.item}`}
                        item={spoiler.item.item}
                        location={spoiler.location}
                        price={spoiler.item.price}
                        model={spoiler.item.model}
                    />
                ))}
            </Grid>
        </Flex>
    );
};

export { ItemList };
