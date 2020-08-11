import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/core';
import { Dashboard } from '../Dashboard';
import { SpoilerLog } from '../../types/spoilerLog';

interface UniverseProps {
    spoilerLogs: SpoilerLog[];
    onReset: () => void;
}

const Universe = ({ spoilerLogs, onReset }: UniverseProps) => {
    return (
        <Tabs width="100%">
            <TabList>
                {spoilerLogs.map((spoilerLog) => (
                    <Tab key={`tab-${spoilerLog.world}`}>
                        <i className="fas fa-globe" />
                        <Text marginLeft={2}>{spoilerLog.world}</Text>
                    </Tab>
                ))}
            </TabList>
            <TabPanels paddingY="0.5em">
                {spoilerLogs.map((spoilerLog) => (
                    <TabPanel key={`panel-${spoilerLog.world}`}>
                        <Dashboard spoilerLog={spoilerLog} onReset={onReset} />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};

export { Universe };
