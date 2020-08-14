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
import { useMediaQuery } from 'react-responsive';
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
        isMobile = useMediaQuery({ maxDeviceWidth: 640 }),
        dispatch = useDispatch();

    const resetButton = (
        <Button
            onClick={onReset}
            marginLeft={[0, 3]}
            width={['35%', 'inherit']}
            marginTop={[3, 0]}
            backgroundColor="red.600"
            color="white"
            alignSelf={isMobile ? 'center' : undefined}
        >
            <i className="fas fa-undo" />
            &nbsp;Reset
        </Button>
    );

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
                <Flex
                    maxWidth={isMobile ? '50%' : undefined}
                    overflowX={isMobile ? 'auto' : undefined}
                >
                    <ShareButton size={isMobile ? 'sm' : undefined} />
                    {!isMobile && resetButton}
                </Flex>
            </Flex>
            <Flex
                padding={[1, 3]}
                marginTop="1em"
                width="100%"
                borderRadius={5}
                bg={bgColor[colorMode]}
            >
                <Tabs width="100%" onChange={setTabIndex}>
                    <TabList
                        width="100%"
                        overflowX="auto"
                        paddingBottom={1}
                        overflowY="hidden"
                    >
                        <Tab>
                            <i className="fas fa-flask-potion" />
                            <Text marginLeft={2} isTruncated>
                                All Items
                            </Text>
                        </Tab>
                        <Tab hidden={!(spoilerLog?.woth ?? []).length}>
                            <i className="fas fa-sword" />
                            <Text marginLeft={2} isTruncated>
                                Way of the Hero
                            </Text>
                        </Tab>
                        <Tab hidden={!(spoilerLog?.playthrough ?? []).length}>
                            <i className="fas fa-scroll-old" />
                            <Text marginLeft={2} isTruncated>
                                Playthrough
                            </Text>
                        </Tab>
                        <Tab hidden={!(spoilerLog?.entrances ?? []).length}>
                            <i className="fas fa-dungeon" />
                            <Text marginLeft={2} isTruncated>
                                Entrances
                            </Text>
                        </Tab>
                        <Tab
                            hidden={
                                !(spoilerLog?.entrancePlaythrough ?? []).length
                            }
                        >
                            <i className="fas fa-map-signs" />
                            <Text marginLeft={2} isTruncated>
                                Entrance Playthrough
                            </Text>
                        </Tab>
                        <Tab>
                            <i className="fas fa-sliders-h" />
                            <Text marginLeft={2} isTruncated>
                                Settings
                            </Text>
                        </Tab>
                    </TabList>
                    <TabPanels padding={[1, 3]}>
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
            {isMobile && resetButton}
        </Flex>
    );
};

export { Dashboard };
