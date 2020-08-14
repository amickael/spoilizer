import React, { useState, useEffect } from 'react';
import {
    Flex,
    Button,
    Text,
    useToast,
    useColorMode,
    useClipboard,
} from '@chakra-ui/core';
import { postSpoilerLog } from '../../api/postSpoilerLog';

const ShareButton = () => {
    const [isLoading, setIsLoading] = useState(false),
        [shareLink, setShareLink] = useState<string>(),
        [isHidden, setIsHidden] = useState(true),
        { colorMode } = useColorMode(),
        { onCopy, hasCopied } = useClipboard(shareLink),
        toast = useToast(),
        bgColor = {
            dark: 'gray.900',
            light: 'gray.100',
        },
        borderColor = { dark: 'gray.600', light: 'gray.200' };

    useEffect(() => {
        if (hasCopied) {
            toast({
                title: 'Link copied',
                status: 'success',
                duration: 1500,
                position: 'top',
            });
        }
    }, [hasCopied, toast]);

    useEffect(() => {
        if (!isHidden) {
            const timeout = setTimeout(() => setIsHidden(true), 15000);
            return () => clearTimeout(timeout);
        }
    }, [isHidden]);

    const handleError = () => {
            toast({
                title: "Couldn't generate sharing link",
                description:
                    'An error occurred while generating a sharing link',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        },
        handleClick = () => {
            const referral = localStorage.getItem('referral');
            if (referral) {
                setShareLink(`${window.location.origin}/${referral}`);
                setIsHidden(false);
            } else {
                setIsLoading(true);
                const spoilerLog = JSON.parse(
                    localStorage.getItem('rawLog') ?? ''
                );
                postSpoilerLog(spoilerLog)
                    .then((resp) => {
                        if (resp.isSuccessful) {
                            localStorage.setItem(
                                'referral',
                                resp.data as string
                            );
                            setShareLink(
                                `${window.location.origin}/${resp.data}`
                            );
                            setIsHidden(false);
                        } else {
                            handleError();
                        }
                    })
                    .catch(handleError)
                    .finally(() => setIsLoading(false));
            }
        };

    return (
        <React.Fragment>
            <Flex
                paddingX="0.5em"
                bg={bgColor[colorMode]}
                borderRadius={5}
                borderColor={borderColor[colorMode]}
                borderWidth={2}
                align="center"
                hidden={isHidden}
                overflowY="auto"
            >
                <Text marginRight="5px" fontSize="sm" isTruncated>
                    {shareLink}
                </Text>
                <Button size="xs" onClick={onCopy} aria-label="copy link">
                    <i className="fas fa-clipboard" />
                </Button>
            </Flex>
            <Button
                onClick={handleClick}
                isDisabled={isLoading}
                hidden={!isHidden}
            >
                <i className="fas fa-link" />
                &nbsp;Get Share Link
            </Button>
        </React.Fragment>
    );
};

export { ShareButton };
