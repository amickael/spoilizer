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
    ButtonGroup,
    Tag,
    Select,
    Text,
    useColorMode,
} from '@chakra-ui/core';
import { useMediaQuery } from 'react-responsive';
import sortBy from 'lodash/sortBy';
import { Item as IItem } from '../../types/Item';
import { Filter } from '../Filter';

interface ItemListProps {
    title?: string;
    itemList: IItem[];
    hideSearch?: boolean;
    hideFilter?: boolean;
    disablePagination?: boolean;
    hideSpoilers?: boolean;
}

const MemoItem = React.memo(Item);
const ItemList = ({
    title = 'Items',
    itemList,
    hideSearch = false,
    hideFilter = false,
    disablePagination = false,
    hideSpoilers = false,
}: ItemListProps) => {
    const { colorMode } = useColorMode(),
        bgColor = {
            dark: 'gray.700',
            light: 'gray.50',
        },
        borderColor = { dark: 'gray.600', light: 'gray.300' },
        sortedData = sortBy(itemList, 'location'),
        [filteredData, setFilteredData] = useState<IItem[]>(sortedData),
        [windowedData, setWindowedData] = useState<IItem[]>([]),
        [numPages, setNumPages] = useState(0),
        [currentPage, setCurrentPage] = useState(0),
        pageSizeOptions = [25, 50, 75, 100],
        [pageSize, setPageSize] = useState(
            disablePagination ? sortedData.length : 50
        ),
        searchKeys = hideSpoilers ? ['location'] : ['location', 'item'],
        isMobile = useMediaQuery({ maxDeviceWidth: 640 });

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
            {!hideFilter && (
                <Filter collection={sortedData} onSearch={setFilteredData} />
            )}
            <Grid
                templateColumns={`repeat(auto-fill, minmax(${
                    isMobile ? '1fr' : '350px'
                }, 1fr))`}
                gap={2}
            >
                {windowedData.map((item) => (
                    <MemoItem
                        key={`${item.location}${item.item}`}
                        {...item}
                        hideSpoilers={hideSpoilers}
                    />
                ))}
            </Grid>
            {numPages > 1 && (
                <Stack
                    isInline
                    width={['100%', '95%']}
                    position="sticky"
                    bottom={4}
                    marginTop={2}
                    justify="space-between"
                    align="center"
                    bg={bgColor[colorMode]}
                    borderColor={borderColor[colorMode]}
                    borderWidth={2}
                    padding={1}
                    borderRadius={5}
                    alignSelf="center"
                    boxShadow="0 5px 5px rgba(0,0,0,0.15)"
                >
                    {!isMobile && (
                        <Box>
                            <Select
                                size="sm"
                                value={pageSize}
                                onChange={handlePageSizeChange}
                                aria-label="select page size"
                            >
                                {pageSizeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option} items per page
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    )}
                    {!isMobile && (
                        <Tag size="sm">
                            Page {currentPage + 1} of {numPages}
                        </Tag>
                    )}
                    <Stack
                        isInline
                        width={isMobile ? '100%' : undefined}
                        justify={isMobile ? 'space-between' : undefined}
                        align="center"
                    >
                        <ButtonGroup
                            size={isMobile ? undefined : 'sm'}
                            isAttached
                        >
                            <Button
                                isDisabled={currentPage === 0}
                                onClick={() => setCurrentPage(0)}
                                aria-label="first page"
                            >
                                <i className="fas fa-angle-double-left" />
                            </Button>
                            <Button
                                isDisabled={currentPage === 0}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                aria-label="previous page"
                            >
                                <i className="fas fa-angle-left" />
                                &nbsp;Back
                            </Button>
                        </ButtonGroup>
                        {isMobile && (
                            <Text fontSize="sm">
                                {currentPage + 1} / {numPages}
                            </Text>
                        )}
                        <ButtonGroup
                            size={isMobile ? undefined : 'sm'}
                            isAttached
                        >
                            <Button
                                isDisabled={currentPage + 1 === numPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                aria-label="next page"
                            >
                                Next&nbsp;
                                <i className="fas fa-angle-right" />
                            </Button>
                            <Button
                                isDisabled={currentPage + 1 === numPages}
                                onClick={() => setCurrentPage(numPages - 1)}
                                aria-label="last page"
                            >
                                <i className="fas fa-angle-double-right" />
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>
            )}
        </Flex>
    );
};

export { ItemList };
