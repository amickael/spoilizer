import React, { useState } from 'react';
import { Entrance } from '../Entrance';
import { Grid, Flex, Heading, Box } from '@chakra-ui/core';
import { Search } from '../Search';
import sortBy from 'lodash/sortBy';
import { Entrance as IEntrance } from '../../types/Entrance';
import { useMediaQuery } from 'react-responsive';

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
        searchKeys = hideSpoilers ? ['entrance'] : ['entrance', 'destination'],
        isMobile = useMediaQuery({ maxDeviceWidth: 640 });

    return (
        <Flex direction="column" width="100%">
            <Flex
                marginTop={[1, 0]}
                marginBottom={[2, 3]}
                width="100%"
                justify="space-between"
                align="center"
            >
                <Heading size="lg" hidden={isMobile && !hideSearch}>
                    {title}
                </Heading>
                {!hideSearch && (
                    <Box width={['100%', '35%']}>
                        <Search
                            collection={sortedData}
                            keys={searchKeys}
                            onSearch={setFilteredData}
                        />
                    </Box>
                )}
            </Flex>
            <Grid
                templateColumns={`repeat(auto-fill, minmax(${
                    isMobile ? '1fr' : '500px'
                }, 1fr))`}
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
