import React, { useState } from 'react';
import { Entrance } from '../Entrance';
import { Grid, Flex, Heading, Box } from '@chakra-ui/core';
import { Search } from '../Search';
import { Entrance as IEntrance } from '../../types/spoilerLog';
import sortBy from 'lodash/sortBy';

interface EntranceListProps {
    title?: string;
    entranceList: IEntrance[];
    hideSearch?: boolean;
}

const MemoEntrance = React.memo(Entrance);
const EntranceList = ({
    title,
    entranceList,
    hideSearch,
}: EntranceListProps) => {
    const [filteredData, setFilteredData] = useState<IEntrance[]>([]),
        sortedData = sortBy(entranceList, 'entrance');

    return (
        <Flex direction="column" width="100%">
            <Flex
                marginBottom="1em"
                width="100%"
                justify="space-between"
                align="center"
            >
                <Heading size="lg">{title}</Heading>
                {!hideSearch && (
                    <Box width="35%">
                        <Search
                            collection={sortedData}
                            keys={['destination']}
                            onSearch={setFilteredData}
                        />
                    </Box>
                )}
            </Flex>
            <Grid
                templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
                gap={2}
            >
                {(filteredData.length ? filteredData : sortedData).map(
                    (entrance) => (
                        <MemoEntrance
                            key={`${entrance.entrance}`}
                            entrance={entrance.entrance}
                            destination={entrance.destination}
                            origin={entrance.origin}
                        />
                    )
                )}
            </Grid>
        </Flex>
    );
};

export { EntranceList };
