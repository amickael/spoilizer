import React, { useState } from 'react';
import { Item } from '../Item';
import { Search } from '../Search';
import { Grid, Flex, Heading, Box } from '@chakra-ui/core';
import { Item as IItem } from '../../types/spoilerLog';

interface SpoilerListProps {
    title?: string;
    spoilerList: IItem[];
    hideSearch?: boolean;
}

const MemoSpoiler = React.memo(Item);
const ItemList = ({
    title = 'Spoilers',
    spoilerList,
    hideSearch = false,
}: SpoilerListProps) => {
    const [filteredData, setFilteredData] = useState<IItem[]>([]);

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
                            collection={spoilerList}
                            keys={['item.item']}
                            onSearch={setFilteredData}
                        />
                    </Box>
                )}
            </Flex>
            <Grid
                templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                gap={2}
            >
                {(filteredData.length ? filteredData : spoilerList).map(
                    (spoiler) => (
                        <MemoSpoiler
                            key={`${spoiler.location}${spoiler.item.item}`}
                            item={spoiler.item.item}
                            location={spoiler.location}
                            price={spoiler.item.price}
                            model={spoiler.item.model}
                        />
                    )
                )}
            </Grid>
        </Flex>
    );
};

export { ItemList };
