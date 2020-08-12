import React, { useState } from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Text,
    Stack,
    Code,
    Flex,
    Button,
    useColorMode,
} from '@chakra-ui/core';
import { Settings as ISettings } from '../../../types/Settings';
import { Search } from '../../../components/Search';
import sortBy from 'lodash/sortBy';
import startCase from 'lodash/startCase';
import ReactJson from 'react-json-view';

interface SettingsProps {
    settings: ISettings;
}

const Settings = ({ settings }: SettingsProps) => {
    const { colorMode } = useColorMode(),
        rjvTheme: { [key: string]: 'summerfruit' | 'summerfruit:inverted' } = {
            dark: 'summerfruit',
            light: 'summerfruit:inverted',
        },
        [tabIndex, setTabIndex] = useState(0),
        sortedData = sortBy(
            Object.entries(settings).map(([key, value]) => ({
                option: startCase(key),
                value: (value || 'N/A').toString(),
            })),
            'option'
        ),
        [filteredData, setFilteredData] = useState(sortedData),
        rawJson = JSON.parse(localStorage.getItem('rawLog') ?? '{}');

    const handleDownload = () => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(rawJson)
            )}`,
            el = document.createElement('a');
        el.setAttribute('style', 'display: none');
        el.setAttribute('href', dataStr);
        el.setAttribute('download', 'spoilerLog.json');
        document.body.appendChild(el);
        el.click();
        el.remove();
    };

    return (
        <Tabs width="100%" onChange={setTabIndex}>
            <TabList>
                <Tab>
                    <i className="fas fa-list" />
                    <Text marginLeft={2}>Formatted</Text>
                </Tab>
                <Tab>
                    <i className="fas fa-brackets-curly" />
                    <Text marginLeft={2}>Raw JSON</Text>
                </Tab>
            </TabList>
            <TabPanels padding="0.5em">
                <TabPanel>
                    <Stack>
                        <Search
                            collection={sortedData}
                            keys={['option']}
                            onSearch={setFilteredData}
                        />
                        <Flex direction="column">
                            {filteredData.map((item) => (
                                <Flex
                                    key={item.option}
                                    justify="space-between"
                                    align="center"
                                >
                                    <Text>{item.option}</Text>
                                    <Code>{item.value}</Code>
                                </Flex>
                            ))}
                        </Flex>
                    </Stack>
                </TabPanel>
                <TabPanel>
                    {tabIndex === 1 && (
                        <Stack>
                            <ReactJson
                                src={rawJson}
                                theme={rjvTheme[colorMode]}
                                collapsed={1}
                                name={false}
                                style={{
                                    padding: '0.25em',
                                    borderRadius: 5,
                                    height: '45vh',
                                    minHeight: 300,
                                    overflowY: 'auto',
                                }}
                            />
                            <Stack
                                isInline
                                justify="space-between"
                                align="center"
                            >
                                <Text fontSize="sm">
                                    Note: Multi-world logs may become slow if
                                    too many nodes are expanded.
                                </Text>
                                <Button
                                    onClick={handleDownload}
                                    marginTop="0.5em"
                                    aria-label="download raw"
                                    width={150}
                                >
                                    <i className="fas fa-download" />
                                    &nbsp; Download
                                </Button>
                            </Stack>
                        </Stack>
                    )}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export { Settings };
