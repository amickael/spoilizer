import React, { useState } from 'react';
import { Option } from '../Option';
import { OptionProps } from '../Option/Option';
import { Search } from '../Search';
import { Grid, Heading, Stack, Divider } from '@chakra-ui/core';
import sortBy from 'lodash/sortBy';
import startCase from 'lodash/startCase';
import { Settings } from '../../types/Settings';

interface OptionListProps {
    optionList: Settings;
}

const OptionList = ({ optionList }: OptionListProps) => {
    const sortedData = sortBy(
            Object.entries(optionList).map(([key, value]) => ({
                option: startCase(key),
                value: value as OptionProps['value'],
            })),
            'option'
        ),
        [filteredData, setFilteredData] = useState(sortedData),
        options = filteredData.filter((item) => !Array.isArray(item.value)),
        selections = filteredData.filter((item) => Array.isArray(item.value));

    return (
        <Stack width="100%" spacing={2}>
            <Search
                collection={sortedData}
                keys={['option']}
                onSearch={setFilteredData}
            />
            {options.length && (
                <React.Fragment>
                    <Divider />
                    <Heading size="md" marginBottom="0.25em">
                        Options
                    </Heading>
                    <Grid
                        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
                        gap={2}
                    >
                        {options.map((item) => (
                            <Option
                                key={item.option}
                                option={item.option}
                                value={item.value}
                            />
                        ))}
                    </Grid>
                </React.Fragment>
            )}
            {selections.length && (
                <React.Fragment>
                    <Divider />
                    <Heading size="md" marginBottom="0.25em">
                        Selections
                    </Heading>
                    <Grid
                        templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                        gap={2}
                    >
                        {selections.map((item) => (
                            <Option
                                key={item.option}
                                option={item.option}
                                value={item.value}
                            />
                        ))}
                    </Grid>
                </React.Fragment>
            )}
        </Stack>
    );
};

export { OptionList };
