import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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

interface SpoilerProps {
    item: string;
    location: string;
    price?: number;
    model?: string;
}

const Spoiler = ({ item, location, price, model }: SpoilerProps) => {
    const { colorMode } = useColorMode(),
        checkedSpoilers = useSelector(
            (state: RootState) => state.checkedSpoilers
        ),
        id = useMemo(() => md5(`${location}${item}`), [location, item]),
        dispatch = useDispatch(),
        isChecked = checkedSpoilers.includes(id),
        bgColor = {
            dark: isChecked ? 'gray.600' : 'gray.900',
            light: isChecked ? 'gray.200' : 'gray.100',
        },
        borderColor = { dark: 'gray.600', light: 'gray.200' };

    const handleChange = () => {
        if (isChecked) {
            dispatch(uncheckSpoiler(id));
        } else {
            dispatch(checkSpoiler(id));
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
                <Heading size="sm">{item}</Heading>
                <Checkbox
                    isChecked={isChecked}
                    onChange={handleChange}
                    aria-label="toggle-inventory"
                />
            </Stack>
            <Text>{location}</Text>
            <Stack isInline>
                {!!price && (
                    <Tooltip
                        label="Item price"
                        aria-label="price-tooltip"
                        placement="top"
                        hasArrow
                    >
                        <Badge variantColor="green" marginRight="0.5em">
                            <i className="fas fa-gem" />
                            &nbsp;{price}
                        </Badge>
                    </Tooltip>
                )}
                {!!model && (
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

export { Spoiler };
