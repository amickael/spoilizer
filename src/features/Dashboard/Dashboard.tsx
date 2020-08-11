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
    useColorMode,
} from '@chakra-ui/core';
import { AllItems } from './AllItems';
import { WayOfTheHero } from './WayOfTheHero';
import { Playthrough } from './Playthrough';
import { Entrances } from './Entrances';
import { EntrancePlaythrough } from './EntrancePlaythrough';
import { SpoilerLog } from '../../types/spoilerLog';

interface DashboardProps {
    spoilerLog: SpoilerLog;
    onReset: () => void;
}

const Dashboard = ({ spoilerLog, onReset }: DashboardProps) => {
    const { colorMode } = useColorMode(),
        bgColor = { dark: 'gray.700', light: 'gray.50' };

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
                        <Tab>
                            <i className="fas fa-clipboard-list-check" />
                            <Text marginLeft={2}>All Items</Text>
                        </Tab>
                        <Tab>
                            <i className="fas fa-sword" />
                            <Text marginLeft={2}>Way of the Hero</Text>
                        </Tab>
                        <Tab>
                            <i className="fas fa-directions" />
                            <Text marginLeft={2}>Playthrough</Text>
                        </Tab>
                        {(spoilerLog?.entrances ?? []).length && (
                            <Tab>
                                <i className="fas fa-dungeon" />
                                <Text marginLeft={2}>Entrances</Text>
                            </Tab>
                        )}
                        {(spoilerLog?.entrancePlaythrough ?? []).length && (
                            <Tab>
                                <i className="fas fa-map-signs" />
                                <Text marginLeft={2}>Entrance Playthrough</Text>
                            </Tab>
                        )}
                    </TabList>
                    <TabPanels padding="0.5em">
                        <TabPanel>
                            <AllItems itemList={spoilerLog?.items ?? []} />
                        </TabPanel>
                        <TabPanel>
                            <WayOfTheHero itemList={spoilerLog?.woth ?? []} />
                        </TabPanel>
                        <TabPanel>
                            <Playthrough
                                playthroughSpheres={
                                    spoilerLog?.playthrough ?? []
                                }
                            />
                        </TabPanel>
                        <TabPanel>
                            <Entrances
                                entranceList={spoilerLog?.entrances ?? []}
                            />
                        </TabPanel>
                        <TabPanel>
                            <EntrancePlaythrough
                                entranceSpheres={
                                    spoilerLog?.entrancePlaythrough ?? []
                                }
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
};

export { Dashboard };
