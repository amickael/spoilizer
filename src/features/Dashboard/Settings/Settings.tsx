import React, { useState } from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Text,
    Stack,
    Button,
    useColorMode,
} from '@chakra-ui/core';
import { Settings as ISettings } from '../../../types/Settings';
import { OptionList } from '../../../components';
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
            <TabPanels padding={1}>
                <TabPanel>
                    {tabIndex === 0 && (
                        <Stack>
                            <OptionList optionList={settings} />
                        </Stack>
                    )}
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
                            <Button
                                onClick={handleDownload}
                                marginTop="0.5em"
                                aria-label="download raw"
                                width={['100%', 250]}
                                alignSelf="flex-end"
                            >
                                <i className="fas fa-download" />
                                &nbsp; Download
                            </Button>
                        </Stack>
                    )}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export { Settings };
