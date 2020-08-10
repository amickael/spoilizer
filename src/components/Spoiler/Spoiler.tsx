import React from 'react';
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
import { Spoiler as ISpoiler } from '../../types/spoilerLog';
import { checkSpoiler, uncheckSpoiler } from '../../provider/appReducer';
import { RootState } from '../../provider/store';
import md5 from 'md5';

interface SpoilerProps {
    spoiler: ISpoiler;
}

const Spoiler = ({ spoiler }: SpoilerProps) => {
    const { colorMode } = useColorMode(),
        key = md5(`${spoiler.location}${spoiler.item.item}`),
        { checkedSpoilers } = useSelector((state: RootState) => state),
        dispatch = useDispatch(),
        isChecked = checkedSpoilers.includes(key),
        bgColor = {
            dark: isChecked ? 'gray.600' : 'gray.900',
            light: isChecked ? 'gray.200' : 'gray.100',
        },
        borderColor = { dark: 'gray.600', light: 'gray.200' };

    const handleChange = () => {
        if (isChecked) {
            dispatch(uncheckSpoiler(key));
        } else {
            dispatch(checkSpoiler(key));
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
                <Heading size="sm">{spoiler.item.item}</Heading>
                <Checkbox isChecked={isChecked} onChange={handleChange} />
            </Stack>
            <Text>{spoiler.location}</Text>
            <Stack isInline>
                {!!spoiler.item.price && (
                    <Tooltip
                        label="Item price"
                        aria-label="price-tooltip"
                        placement="top"
                        hasArrow
                    >
                        <Badge variantColor="green" marginRight="0.5em">
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
