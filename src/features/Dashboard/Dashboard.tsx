import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Flex,
    Button,
    Text,
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
import { Settings } from './Settings';
import { SpoilerLog } from '../../types/SpoilerLog';
import { RootState } from '../../provider/store';
import { ShareButton } from '../../components/ShareButton';
import { toggleSpoilers } from '../../provider/appReducer';

interface DashboardProps {
    spoilerLog: SpoilerLog;
    onReset: () => void;
}

const Dashboard = ({ spoilerLog, onReset }: DashboardProps) => {
    const { colorMode } = useColorMode(),
        bgColor = { dark: 'gray.700', light: 'gray.50' },
        [tabIndex, setTabIndex] = useState(0),
        { hideSpoilers } = useSelector((state: RootState) => state),
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
                <Flex align="center" marginLeft="0.5em">
                    <FormLabel htmlFor="hide-spoilers">Hide spoilers</FormLabel>
                    <Switch
                        id="hide-spoilers"
                        isChecked={hideSpoilers}
                        onChange={() => dispatch(toggleSpoilers())}
                    />
                </Flex>
                <Flex>
                    <ShareButton />
                    <Button onClick={onReset} marginLeft="0.5em">
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
                            <i className="fas fa-flask-potion" />
                            <Text marginLeft={2}>All Items</Text>
                        </Tab>
                        <Tab hidden={!(spoilerLog?.woth ?? []).length}>
                            <i className="fas fa-sword" />
                            <Text marginLeft={2}>Way of the Hero</Text>
                        </Tab>
                        <Tab hidden={!(spoilerLog?.playthrough ?? []).length}>
                            <i className="fas fa-scroll-old" />
                            <Text marginLeft={2}>Playthrough</Text>
                        </Tab>
                        <Tab hidden={!(spoilerLog?.entrances ?? []).length}>
                            <i className="fas fa-dungeon" />
                            <Text marginLeft={2}>Entrances</Text>
                        </Tab>
                        <Tab
                            hidden={
                                !(spoilerLog?.entrancePlaythrough ?? []).length
                            }
                        >
                            <i className="fas fa-map-signs" />
                            <Text marginLeft={2}>Entrance Playthrough</Text>
                        </Tab>
                        <Tab>
                            <i className="fas fa-sliders-h" />
                            <Text marginLeft={2}>Settings</Text>
                        </Tab>
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
                        <TabPanel>
                            {tabIndex === 5 && (
                                <Settings
                                    settings={spoilerLog?.settings ?? {}}
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
