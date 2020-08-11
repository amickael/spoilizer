import React, { useState, useEffect, useMemo } from 'react';
import {
    InputGroup,
    InputLeftElement,
    InputRightElement,
    IconButton,
    Icon,
    Input,
} from '@chakra-ui/core';
import Fuse from 'fuse.js';

export interface SearchProps {
    collection: unknown[];
    keys: string[];
    onSearch: (results: any[]) => void;
    placeholder?: string;
}

const Search = ({
    collection,
    onSearch,
    keys,
    placeholder = 'Search',
}: SearchProps) => {
    const [query, setQuery] = useState(''),
        serializedCollection = JSON.stringify(collection),
        fuse = useMemo(
            () => new Fuse(collection, { keys: keys, threshold: 0.25 }),
            [collection, keys]
        ),
        searchResult = useMemo(
            () =>
                JSON.stringify(fuse.search(query).map((result) => result.item)),
            [fuse, query]
        );

    const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        onSearch(
            !!query
                ? JSON.parse(searchResult)
                : JSON.parse(serializedCollection)
        );
    }, [onSearch, searchResult, serializedCollection, query]);

    return (
        <InputGroup width="100%">
            <InputLeftElement children={<Icon name="search" />} />
            <Input
                value={query}
                placeholder={placeholder}
                onChange={handleQuery}
                aria-label="search"
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
    );
};

export { Search };
