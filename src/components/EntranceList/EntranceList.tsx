import React, { useState } from 'react';
import { Entrance } from '../Entrance';
import { Grid, Flex, Heading, Box } from '@chakra-ui/core';
import { Search } from '../Search';
import sortBy from 'lodash/sortBy';
import { Entrance as IEntrance } from '../../types/Entrance';

interface EntranceListProps {
    title?: string;
    entranceList: IEntrance[];
    hideSearch?: boolean;
    hideSpoilers?: boolean;
}

const MemoEntrance = React.memo(Entrance);
const EntranceList = ({
    title = '',
    entranceList,
    hideSearch = false,
    hideSpoilers = false,
}: EntranceListProps) => {
    const sortedData = sortBy(entranceList, 'entrance'),
        [filteredData, setFilteredData] = useState<IEntrance[]>(sortedData),
        searchKeys = hideSpoilers ? ['entrance'] : ['entrance', 'destination'];

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
                            keys={searchKeys}
                            onSearch={setFilteredData}
                        />
                    </Box>
                )}
            </Flex>
            <Grid
                templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
                gap={2}
            >
                {filteredData.map((entrance) => (
                    <MemoEntrance
                        key={`${entrance.entrance}`}
                        entrance={entrance.entrance}
                        destination={entrance.destination}
                        origin={entrance.origin}
                        hideSpoilers={hideSpoilers}
                    />
                ))}
            </Grid>
        </Flex>
    );
};

export { EntranceList };
