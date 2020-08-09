import React from 'react';
import {
    Flex,
    Button,
    Text,
    Code,
    Stack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Box,
    useColorMode,
} from '@chakra-ui/core';
import { SpoilerList } from '../../components';
import { SpoilerLog } from '../../types/spoilerLog';

interface DashboardProps {
    spoilerLog: SpoilerLog;
    onReset: () => void;
}

const Dashboard = ({ spoilerLog, onReset }: DashboardProps) => {
    const { colorMode } = useColorMode(),
        bgColor = { dark: 'gray.700', light: 'gray.100' };

    return (
        <Flex width="100%" direction="column">
            <Flex
                width="100%"
                justify="space-between"
                align="center"
                padding="0.5em"
                bg={bgColor[colorMode]}
                borderRadius={5}
            >
                <Flex>
                    <Stack spacing="0.25em" marginRight="0.5em">
                        <Text>Seed</Text>
                        <Code>{spoilerLog.seed}</Code>
                    </Stack>
                    <Stack spacing="0.25em">
                        <Text>Settings</Text>
                        <Code>{spoilerLog.settings}</Code>
                    </Stack>
                </Flex>
                <Button onClick={onReset}>
                    <i className="fas fa-undo" />
                    &nbsp;Reset
                </Button>
            </Flex>
            <Flex
                padding="0.5em"
                marginTop="1em"
                width="100%"
                borderRadius={5}
                bg={bgColor[colorMode]}
            >
                <Tabs width="100%">
                    <TabList>
                        <Tab>All Items</Tab>
                        <Tab>Way of the Hero</Tab>
                        <Tab>Playthrough</Tab>
                    </TabList>
                    <TabPanels padding="0.5em">
                        <TabPanel>
                            <SpoilerList
                                title="All Items"
                                spoilerList={spoilerLog.locations}
                            />
                        </TabPanel>
                        <TabPanel>
                            <SpoilerList
                                title="Way of the Hero"
                                spoilerList={spoilerLog.essentials}
                            />
                        </TabPanel>
                        <TabPanel>
                            {spoilerLog.playthrough.map((step, i) => (
                                <Box key={i} paddingY="0.5em">
                                    <SpoilerList
                                        title={`Sphere ${step.stepNum}`}
                                        spoilerList={step.items}
                                        hideSearch
                                    />
                                </Box>
                            ))}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
};

export { Dashboard };
