import React, { useState } from 'react';
import { Item } from '../Item';
import { Search } from '../Search';
import { Grid, Flex, Heading, Box } from '@chakra-ui/core';
import { Item as IItem } from '../../types/spoilerLog';
import sortBy from 'lodash/sortBy';

interface ItemListProps {
    title?: string;
    itemList: IItem[];
    hideSearch?: boolean;
}

const MemoSpoiler = React.memo(Item);
const ItemList = ({
    title = 'Items',
    itemList,
    hideSearch = false,
}: ItemListProps) => {
    const sortedData = sortBy(itemList, 'location'),
        [filteredData, setFilteredData] = useState<IItem[]>(sortedData);

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
                {filteredData.map((item) => (
                    <MemoSpoiler
                        key={`${item.location}${item.item.item}`}
                        item={item.item.item}
                        location={item.location}
                        price={item.item.price}
                        model={item.item.model}
                    />
                ))}
            </Grid>
        </Flex>
    );
};

export { ItemList };
