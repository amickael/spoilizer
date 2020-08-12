import React from 'react';
import {
    Stack,
    List,
    ListItem,
    Code,
    Text,
    Heading,
    Divider,
    useColorMode,
} from '@chakra-ui/core';
import startCase from 'lodash/startCase';

export interface OptionProps {
    option: string;
    value: boolean | string | number | string[];
}

const Option = ({ option, value }: OptionProps) => {
    const { colorMode } = useColorMode(),
        bgColor = {
            dark: 'gray.900',
            light: 'gray.100',
        },
        borderColor = { dark: 'gray.600', light: 'gray.200' };

    let displayValue = <Text>{startCase(value.toString())}</Text>,
        isList = false;
    switch (typeof value) {
        case 'boolean':
            displayValue = (
                <Code variantColor={value ? 'green' : 'red'}>
                    {value.toString()}
                </Code>
            );
            break;
        case 'object':
            if (Array.isArray(value)) {
                isList = true;
                if (value.length) {
                    displayValue = (
                        <List styleType="disc">
                            {(value as string[]).map((item, i) => (
                                <ListItem key={i}>
                                    {startCase(item)
                                        .replace('Poh', 'POH')
                                        .replace('Dc', 'DC')}
                                </ListItem>
                            ))}
                        </List>
                    );
                } else {
                    displayValue = <Text>N/A</Text>;
                }
            }
    }

    return (
        <Stack
            spacing="0.25em"
            bg={bgColor[colorMode]}
            padding="0.5em"
            borderRadius={5}
            borderColor={borderColor[colorMode]}
            borderWidth={1}
            isInline={!isList}
            align={isList ? undefined : 'center'}
        >
            <Heading size="sm" style={{ margin: isList ? 0 : undefined }}>
                {option.replace('Tod', 'TOD')}
                {!isList && ': '}
            </Heading>
            {isList && <Divider />}
            {displayValue}
        </Stack>
    );
};

export { Option };
