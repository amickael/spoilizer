import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Stack,
    Badge,
    Text,
    Tooltip,
    Heading,
    Checkbox,
    useColorMode,
} from '@chakra-ui/core';
import { checkSpoiler, uncheckSpoiler } from '../../provider/appReducer';
import { RootState } from '../../provider/store';
import md5 from 'md5';
import { Item as IITem } from '../../types/Item';

interface ItemProps extends IITem {
    hideSpoilers?: boolean;
}

const Item = ({
    item,
    location,
    price,
    model,
    player,
    hideSpoilers = false,
}: ItemProps) => {
    const { colorMode } = useColorMode(),
        checkedSpoilers = useSelector(
            (state: RootState) => state.checkedSpoilers
        ),
        id = md5(`${location}${item}`),
        dispatch = useDispatch(),
        isChecked = checkedSpoilers.includes(id),
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
                dispatch(uncheckSpoiler(id));
            } else {
                dispatch(checkSpoiler(id));
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
            spacing={1}
            bg={bgColor[colorMode]}
            padding={2}
            borderRadius={5}
            borderColor={borderColor[colorMode]}
            borderWidth={1}
            onContextMenu={handleContextMenu}
        >
            <Stack isInline justify="space-between">
                <Heading size="sm">{location}</Heading>
                <Checkbox
                    isChecked={isChecked}
                    onChange={handleChange}
                    aria-label="toggle-inventory"
                />
            </Stack>
            <Box bg={isHidden ? borderColor[colorMode] : undefined}>
                <Text opacity={isHidden ? 0 : 100}>{isHidden ? id : item}</Text>
            </Box>
            <Stack isInline>
                {!!player && !isHidden && (
                    <Badge variantColor="blue" marginRight={2}>
                        <i className="fas fa-user" />
                        &nbsp;Player {player}
                    </Badge>
                )}
                {!!price && !isHidden && (
                    <Tooltip
                        label="Item price"
                        aria-label="price-tooltip"
                        placement="top"
                        hasArrow
                    >
                        <Badge variantColor="green" marginRight={2}>
                            <i className="fas fa-gem" />
                            &nbsp;{price}
                        </Badge>
                    </Tooltip>
                )}
                {!!model && !isHidden && (
                    <Tooltip
                        label="Visual model"
                        aria-label="model-tooltip"
                        placement="top"
                        hasArrow
                    >
                        <Badge variantColor="red">
                            <i className="fas fa-draw-polygon" />
                            &nbsp;{model}
                        </Badge>
                    </Tooltip>
                )}
            </Stack>
        </Stack>
    );
};

export { Item };
