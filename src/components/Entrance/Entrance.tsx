import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Text, Heading, Checkbox, useColorMode } from '@chakra-ui/core';
import { Entrance as IEntrance } from '../../types/spoilerLog';
import { RootState } from '../../provider/store';
import { checkEntrance, uncheckEntrance } from '../../provider/appReducer';
import md5 from 'md5';

const Entrance = ({ entrance, destination, origin }: IEntrance) => {
    const { colorMode } = useColorMode(),
        id = md5(`${entrance}${destination}`),
        dispatch = useDispatch(),
        checkedEntrances = useSelector(
            (state: RootState) => state.checkedEntrances
        ),
        isChecked = checkedEntrances.includes(id),
        bgColor = {
            dark: isChecked ? 'gray.600' : 'gray.900',
            light: isChecked ? 'gray.200' : 'gray.100',
        },
        borderColor = { dark: 'gray.600', light: 'gray.200' };

    const handleChange = () => {
        if (isChecked) {
            dispatch(uncheckEntrance(id));
        } else {
            dispatch(checkEntrance(id));
        }
    };

    return (
        <Stack
            spacing="0.25em"
            bg={bgColor[colorMode]}
            padding="0.5em"
            borderRadius={5}
            borderColor={borderColor[colorMode]}
            borderWidth={1}
        >
            <Stack isInline justify="space-between">
                <Heading size="sm">{entrance.replace('->', '➤')}</Heading>
                <Checkbox
                    isChecked={isChecked}
                    onChange={handleChange}
                    aria-label="toggle-entrance"
                />
            </Stack>
            <Text>{destination}</Text>
            {origin && (
                <Text fontSize="sm">
                    <i className="fas fa-dungeon" />
                    &nbsp;{origin}
                </Text>
            )}
        </Stack>
    );
};

export { Entrance };
