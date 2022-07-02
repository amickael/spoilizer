import React from 'react';
import { Flex, Button } from '@chakra-ui/core';

const Filter = () => {
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
        // { name: 'Spirit Child', query: ['Spirit Temple Child'] },
        { name: 'Spirit', query: ['Twinrova', 'Spirit Temple'] },
        { name: "Ganon's Castle", query: ['Ganons Castle'] },
    ];
    const songQuery = ['song', 'sheik'];

    return (
        <Flex
            marginTop={[1, 0]}
            marginBottom={[2, 3]}
            width="100%"
            align="center"
            direction="column"
            justify="start"
        >
            <Flex align="center">
                Areas:
                {areaList.map((e) => {
                    return (
                        <Button
                            key={e.name}
                            onClick={() => {
                                console.log(e.query);
                            }}
                        >
                            {e.name}
                        </Button>
                    );
                })}
            </Flex>
            <Flex align="center">
                Dungeons:
                {dungeonList.map((e) => {
                    return <Button key={e.name}>{e.name}</Button>;
                })}
            </Flex>
            <Flex align="center">
                Songs:
                <Button>Songs</Button>
            </Flex>
        </Flex>
    );
};

export { Filter };
