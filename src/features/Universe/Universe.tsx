import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/core';
import { Dashboard } from '../Dashboard';
import { SpoilerLog } from '../../types/SpoilerLog';

interface UniverseProps {
    spoilerLogs: SpoilerLog[];
    onReset: () => void;
}

const Universe = ({ spoilerLogs, onReset }: UniverseProps) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Tabs width="100%" onChange={setTabIndex}>
            <TabList>
                {spoilerLogs.map((spoilerLog) => (
                    <Tab key={`tab-${spoilerLog.world}`}>
                        <i className="fas fa-globe" />
                        <Text marginLeft={2}>{spoilerLog.world}</Text>
                    </Tab>
                ))}
            </TabList>
            <TabPanels paddingY="0.5em">
                {spoilerLogs.map((spoilerLog, i) => (
                    <TabPanel key={`panel-${spoilerLog.world}`}>
                        {tabIndex === i && (
                            <Dashboard
                                spoilerLog={spoilerLog}
                                onReset={onReset}
                            />
                        )}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};

export { Universe };
