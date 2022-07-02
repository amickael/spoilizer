import React, { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Flex, Button } from '@chakra-ui/core';
import Fuse from 'fuse.js';

export interface FilterProps {
    collection: unknown[];
    onSearch: (results: any[]) => void;
}

const Filter = ({ onSearch, collection }: FilterProps) => {
    const areaList = [
        { name: 'HF/LLR', query: ['HF', 'LLR'] },
        { name: 'Castle/Market', query: ['Market', 'ToT', 'HC', 'OGC'] },
        { name: 'KF/LW', query: ['KF', 'LW', 'Deku Theater', 'SFM'] },
        { name: 'Kak', query: ['Kak', 'Graveyard'] },
        { name: 'DM/GC', query: ['DMT', 'GC', 'DMC'] },
        { name: 'ZR/ZD/ZF', query: ['ZR', 'ZD', 'ZF'] },
        { name: 'LH', query: ['LH'] },
        { name: 'GD', query: ['GV', 'GF', 'Wasteland', 'Colossus'] },
    ];
    const dungeonList = [
        { name: 'Deku Tree', query: ['Queen Gohma', 'Deku Tree'] },
        { name: 'Dodongo', query: ['King Dodongo', 'Dodongos Cavern'] },
        { name: 'Jabu Jabu', query: ['Barinade', 'Jabu Jabus Belly '] },
        { name: 'Forest', query: ['Phantom Ganon', 'Forest Temple '] },
        { name: 'Fire', query: ['Volvagia', 'Fire Temple'] },
        { name: 'Ice Cavern', query: ['Ice Cavern'] },
        { name: 'Water', query: ['Morpha', 'Water Temple '] },
        { name: 'BotW', query: ['Bottom of the Well'] },
        { name: 'Shadow', query: ['Bongo Bongo', 'Shadow Temple'] },
        { name: 'GTG', query: ['Gerudo Training Ground'] },
        { name: 'Spirit', query: ['Twinrova', 'Spirit Temple'] },
        { name: "Ganon's Castle", query: ['Ganons Castle'] },
    ];
    const songQuery = ['song', 'sheik'];

    const isMobile = useMediaQuery({ maxDeviceWidth: 640 });

    const [query, setQuery] = useState(''),
        serializedCollection = JSON.stringify(collection),
        fuse = useMemo(
            () =>
                new Fuse(collection, {
                    useExtendedSearch: true,
                    keys: ['location'],
                    threshold: 0.25,
                }),
            [collection]
        ),
        searchResult = useMemo(
            () =>
                JSON.stringify(fuse.search(query).map((result) => result.item)),
            [fuse, query]
        );

    useEffect(() => {
        onSearch(
            !!query
                ? JSON.parse(searchResult)
                : JSON.parse(serializedCollection)
        );
    }, [onSearch, searchResult, serializedCollection, query]);

    const loopQuery = (queries: string[]) => {
        let searchString = '';
        queries.forEach((e, i) => {
            if (i === 0) {
                searchString = `^${e}`;
            } else {
                searchString = `${searchString} | ^${e}`;
            }
        });
        setQuery(searchString);
    };

    const handleClick = (queries: string[]) => {
        if (query.startsWith(`^${queries[0]}`)) {
            setQuery('');
        } else {
            loopQuery(queries);
        }
    };

    return (
        <Flex
            marginTop={[1, 0]}
            marginBottom={[2, 3]}
            width="100%"
            direction="column"
        >
            <Flex wrap="wrap" direction="column">
                <b>Areas</b>

                <Flex marginTop={[1, 1]} wrap="wrap">
                    {areaList.map((e) => {
                        return (
                            <Button
                                marginRight={[2, 2]}
                                marginBottom={[2, 2]}
                                _hover={{
                                    color: 'white',
                                    backgroundColor: 'blue.600',
                                }}
                                _active={{
                                    color: 'white',
                                    backgroundColor: 'blue.700',
                                }}
                                key={e.name}
                                onClick={() => {
                                    handleClick(e.query);
                                }}
                            >
                                {e.name}
                            </Button>
                        );
                    })}
                </Flex>
            </Flex>
            <Flex wrap="wrap" direction="column">
                <b>Dungeons</b>
                <Flex marginTop={[1, 1]} wrap="wrap">
                    {dungeonList.map((e) => {
                        return (
                            <Button
                                marginRight={[2, 2]}
                                marginBottom={[2, 2]}
                                _hover={{
                                    color: 'white',
                                    backgroundColor: 'blue.600',
                                }}
                                _active={{
                                    color: 'white',
                                    backgroundColor: 'blue.700',
                                }}
                                key={e.name}
                                onClick={() => {
                                    handleClick(e.query);
                                }}
                            >
                                {e.name}
                            </Button>
                        );
                    })}
                </Flex>
            </Flex>
            <Flex direction="column" align="start">
                <Button
                    marginTop={[4, 4]}
                    _hover={{
                        color: 'white',
                        backgroundColor: 'blue.600',
                    }}
                    _active={{
                        color: 'white',
                        backgroundColor: 'blue.700',
                    }}
                    onClick={() => {
                        handleClick(songQuery);
                    }}
                >
                    <b>Songs</b>
                </Button>
            </Flex>
        </Flex>
    );
};

export { Filter };
