import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Spinner, useToast } from '@chakra-ui/core';
import { parseLog, parseMultiLog } from '../../utils/parseLog';
import { useParams, useHistory } from 'react-router-dom';
import { getSpoilerLog } from '../../api/getSpoilerLog';
import { reset, setSpoilerLog } from '../../provider/appReducer';
import { SpoilerLog } from '../../types/SpoilerLog';

const SharedLog = () => {
    const { logId } = useParams(),
        toast = useToast(),
        history = useHistory(),
        dispatch = useDispatch();

    useEffect(() => {
        const handleSuccess = (spoilerLog: SpoilerLog | SpoilerLog[]) => {
                dispatch(reset());
                dispatch(setSpoilerLog(spoilerLog));
                localStorage.setItem('referral', logId);
            },
            handleError = () => {
                toast({
                    title: 'Invalid URL',
                    description:
                        'This spoiler log does not exist or has expired',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });
            };

        getSpoilerLog(logId)
            .then((spoilerLog) => {
                if (spoilerLog.isSuccessful) {
                    localStorage.setItem(
                        'rawLog',
                        JSON.stringify(spoilerLog.data)
                    );
                    const data = spoilerLog.data as { [key: string]: any },
                        isMultiworld = (data?.settings?.world_count ?? 0) > 1;
                    if (isMultiworld) {
                        parseMultiLog(data)
                            .then(handleSuccess)
                            .catch(handleError);
                    } else {
                        parseLog(data).then(handleSuccess).catch(handleError);
                    }
                } else {
                    handleError();
                }
            })
            .catch(handleError)
            .finally(() => {
                history.push('/');
            });
    }, [logId, dispatch, toast, history]);

    return (
        <Flex width="100%" height="50vh" justify="center" align="center">
            <Spinner size="xl" />
        </Flex>
    );
};

export { SharedLog };
