import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, useToast } from '@chakra-ui/core';
import { RootState } from './provider/store';
import { setSpoilerLog, reset } from './provider/appReducer';
import { Upload, Dashboard, Universe } from './features';

const App = () => {
    const toast = useToast(),
        dispatch = useDispatch(),
        { spoilerLog } = useSelector((state: RootState) => state);

    const handleError = () => {
        toast({
            title: 'Invalid format',
            description: 'JSON file is not a valid spoiler log format',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
        });
    };

    if (!spoilerLog) {
        return (
            <Flex
                align="center"
                justify="center"
                direction="column"
                paddingTop="25vh"
            >
                <Upload
                    onSuccess={(spoilerLog) =>
                        dispatch(setSpoilerLog(spoilerLog))
                    }
                    onError={handleError}
                >
                    Upload Spoiler Log
                </Upload>
            </Flex>
        );
    }

    return (
        <Flex padding="1em" direction="column">
            {Array.isArray(spoilerLog) ? (
                <Universe
                    spoilerLogs={spoilerLog}
                    onReset={() => dispatch(reset())}
                />
            ) : (
                <Dashboard
                    spoilerLog={spoilerLog}
                    onReset={() => dispatch(reset())}
                />
            )}
        </Flex>
    );
};

export default App;
