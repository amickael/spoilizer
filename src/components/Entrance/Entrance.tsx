import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Stack,
    Text,
    Heading,
    Checkbox,
    Box,
    useColorMode,
} from '@chakra-ui/core';
import { RootState } from '../../provider/store';
import { checkEntrance, uncheckEntrance } from '../../provider/appReducer';
import md5 from 'md5';
import { Entrance as IEntrance } from '../../types/Entrance';

interface EntranceProps extends IEntrance {
    hideSpoilers?: boolean;
}

const Entrance = ({
    entrance,
    destination,
    origin,
    hideSpoilers = false,
}: EntranceProps) => {
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
        borderColor = { dark: 'gray.600', light: 'gray.200' },
        [isHidden, setIsHidden] = useState(hideSpoilers);

    useEffect(() => {
        setIsHidden(!isChecked && hideSpoilers);
    }, [isChecked, hideSpoilers]);

    const handleChange = () => {
            if (isChecked) {
                dispatch(uncheckEntrance(id));
            } else {
                dispatch(checkEntrance(id));
            }
        },
        handleContextMenu = (event: React.MouseEvent<any, MouseEvent>) => {
            event.preventDefault();
            if (hideSpoilers) {
                setIsHidden(!isHidden);
            }
            return false;
        };

    return (
        <Stack
            spacing="0.25em"
            bg={bgColor[colorMode]}
            padding="0.5em"
            borderRadius={5}
            borderColor={borderColor[colorMode]}
            borderWidth={1}
            onContextMenu={handleContextMenu}
        >
            <Stack isInline justify="space-between">
                <Heading size="sm">{entrance.replace('->', '➤')}</Heading>
                <Checkbox
                    isChecked={isChecked}
                    onChange={handleChange}
                    aria-label="toggle-entrance"
                />
            </Stack>
            <Box bg={isHidden ? borderColor[colorMode] : undefined}>
                <Text opacity={isHidden ? 0 : 100}>
                    {isHidden ? id : destination}
                </Text>
            </Box>
            {origin && !isHidden && (
                <Text fontSize="sm">
                    <i className="fas fa-dungeon" />
                    &nbsp;{origin}
                </Text>
            )}
        </Stack>
    );
};

export { Entrance };
