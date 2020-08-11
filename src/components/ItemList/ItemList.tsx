import React, { useState, useEffect } from 'react';
import { Item } from '../Item';
import { Search } from '../Search';
import {
    Grid,
    Flex,
    Heading,
    Box,
    Stack,
    Button,
    Tag,
    Select,
    useColorMode,
} from '@chakra-ui/core';
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
    const { colorMode } = useColorMode(),
        bgColor = {
            dark: 'gray.800',
            light: 'gray.200',
        },
        borderColor = { dark: 'gray.600', light: 'gray.300' },
        sortedData = sortBy(itemList, 'location'),
        [filteredData, setFilteredData] = useState<IItem[]>(sortedData),
        [windowedData, setWindowedData] = useState<IItem[]>([]),
        [numPages, setNumPages] = useState(0),
        [currentPage, setCurrentPage] = useState(0),
        pageSizeOptions = [25, 50, 75, 100],
        [pageSize, setPageSize] = useState(50);

    const handlePageSizeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setPageSize(parseInt(event.target.value));
    };

    useEffect(() => {
        setNumPages(Math.ceil(filteredData.length / pageSize));
        setWindowedData(
            filteredData.slice(
                currentPage * pageSize,
                currentPage * pageSize + pageSize
            )
        );
    }, [filteredData, pageSize, currentPage]);

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
                            keys={['item']}
                            onSearch={setFilteredData}
                        />
                    </Box>
                )}
            </Flex>
            <Grid
                templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                gap={2}
            >
                {windowedData.map((item) => (
                    <MemoSpoiler
                        key={`${item.location}${item.item}`}
                        {...item}
                    />
                ))}
            </Grid>
            {numPages > 1 && (
                <Stack
                    isInline
                    width="95%"
                    position="sticky"
                    bottom={2}
                    marginTop="0.5em"
                    justify="space-between"
                    align="center"
                    bg={bgColor[colorMode]}
                    borderColor={borderColor[colorMode]}
                    borderWidth={2}
                    padding="0.25em"
                    borderRadius={5}
                    alignSelf="center"
                    boxShadow="0 3px 5px rgba(0,0,0,0.15)"
                >
                    <Box>
                        <Select
                            size="sm"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >
                            {pageSizeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option} items per page
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Tag size="sm">
                        Page {currentPage + 1} of {numPages}
                    </Tag>
                    <Stack isInline>
                        <Button
                            size="sm"
                            isDisabled={currentPage === 0}
                            onClick={() => setCurrentPage(0)}
                        >
                            <i className="fas fa-angle-double-left" />
                        </Button>
                        <Button
                            size="sm"
                            isDisabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <i className="fas fa-angle-left" />
                            &nbsp;Back
                        </Button>
                        <Button
                            size="sm"
                            isDisabled={currentPage + 1 === numPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next&nbsp;
                            <i className="fas fa-angle-right" />
                        </Button>
                        <Button
                            size="sm"
                            isDisabled={currentPage + 1 === numPages}
                            onClick={() => setCurrentPage(numPages - 1)}
                        >
                            <i className="fas fa-angle-double-right" />
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Flex>
    );
};

export { ItemList };
