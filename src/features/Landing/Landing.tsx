import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, useToast } from '@chakra-ui/core';
import { RootState } from '../../provider/store';
import { setSpoilerLog, reset } from '../../provider/appReducer';
import { Upload, Dashboard, Universe } from '../';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const Fallback = ({ resetErrorBoundary }: FallbackProps) => {
    resetErrorBoundary();
    return <React.Fragment />;
};

const Landing = () => {
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
        },
        handleReset = () => {
            localStorage.clear();
            dispatch(reset());
        };

    if (!spoilerLog) {
        return (
            <Flex
                align="center"
                justify="center"
                direction="column"
                paddingTop="5vh"
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
        <ErrorBoundary FallbackComponent={Fallback} onReset={handleReset}>
            <Flex padding={[2, 4]} direction="column">
                {Array.isArray(spoilerLog) ? (
                    <Universe spoilerLogs={spoilerLog} onReset={handleReset} />
                ) : (
                    <Dashboard spoilerLog={spoilerLog} onReset={handleReset} />
                )}
            </Flex>
        </ErrorBoundary>
    );
};

export { Landing };
