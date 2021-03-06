import React, { useState, useEffect } from 'react';
import { Button, useToast, useClipboard, IButton } from '@chakra-ui/core';
import { postSpoilerLog } from '../../api/postSpoilerLog';

interface ShareButtonProps {
    size?: IButton['size'];
}

const ShareButton = ({ size = undefined }: ShareButtonProps) => {
    const [isLoading, setIsLoading] = useState(false),
        [shareLink, setShareLink] = useState<string>(),
        [shouldCopy, setShouldCopy] = useState(false),
        { onCopy, hasCopied } = useClipboard(shareLink),
        toast = useToast();

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
        if (shouldCopy && onCopy) {
            onCopy();
            setShouldCopy(false);
        }
    }, [onCopy, shouldCopy]);

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
                setShouldCopy(true);
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
                            setShouldCopy(true);
                        } else {
                            handleError();
                        }
                    })
                    .catch(handleError)
                    .finally(() => setIsLoading(false));
            }
        };

    return (
        <Button
            key={isLoading.toString()}
            onClick={handleClick}
            isLoading={isLoading}
            _hover={{ color: 'white', backgroundColor: 'blue.600' }}
            _active={{ color: 'white', backgroundColor: 'blue.700' }}
            loadingText="Generating..."
            size={size}
        >
            <i className="fas fa-link" />
            &nbsp;Copy Share Link
        </Button>
    );
};

export { ShareButton };
