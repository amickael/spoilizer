import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    Switch,
    FormLabel,
    useColorMode,
} from '@chakra-ui/core';
import { AllItems } from './AllItems';
import { WayOfTheHero } from './WayOfTheHero';
import { Playthrough } from './Playthrough';
import { Entrances } from './Entrances';
import { EntrancePlaythrough } from './EntrancePlaythrough';
import { SpoilerLog } from '../../types/SpoilerLog';
import { RootState } from '../../provider/store';
import { toggleSpoilers } from '../../provider/appReducer';

interface DashboardProps {
    spoilerLog: SpoilerLog;
    onReset: () => void;
}

const Dashboard = ({ spoilerLog, onReset }: DashboardProps) => {
    const { colorMode } = useColorMode(),
        bgColor = { dark: 'gray.700', light: 'gray.50' },
        [tabIndex, setTabIndex] = useState(0),
        hideSpoilers = useSelector((state: RootState) => state.hideSpoilers),
        dispatch = useDispatch();

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
                        <Code>{spoilerLog.settingsString}</Code>
                    </Stack>
                </Flex>
                <Flex>
                    <Flex justify="center" align="center" marginRight="1em">
                        <FormLabel htmlFor="hide-spoilers">
                            Hide spoilers
                        </FormLabel>
                        <Switch
                            id="hide-spoilers"
                            isChecked={hideSpoilers}
                            onChange={() => dispatch(toggleSpoilers())}
                        />
                    </Flex>
                    <Button onClick={onReset}>
                        <i className="fas fa-undo" />
                        &nbsp;Reset
                    </Button>
                </Flex>
            </Flex>
            <Flex
                padding="0.5em"
                marginTop="1em"
                width="100%"
                borderRadius={5}
                bg={bgColor[colorMode]}
            >
                <Tabs width="100%" onChange={setTabIndex}>
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
                            <i className="fas fa-scroll-old" />
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
                            {tabIndex === 0 && (
                                <AllItems
                                    itemList={spoilerLog?.items ?? []}
                                    hideSpoilers={hideSpoilers}
                                />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {tabIndex === 1 && (
                                <WayOfTheHero
                                    itemList={spoilerLog?.woth ?? []}
                                    hideSpoilers={hideSpoilers}
                                />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {tabIndex === 2 && (
                                <Playthrough
                                    playthroughSpheres={
                                        spoilerLog?.playthrough ?? []
                                    }
                                    hideSpoilers={hideSpoilers}
                                />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {tabIndex === 3 && (
                                <Entrances
                                    entranceList={spoilerLog?.entrances ?? []}
                                    hideSpoilers={hideSpoilers}
                                />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {tabIndex === 4 && (
                                <EntrancePlaythrough
                                    entranceSpheres={
                                        spoilerLog?.entrancePlaythrough ?? []
                                    }
                                    hideSpoilers={hideSpoilers}
                                />
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
};

export { Dashboard };
