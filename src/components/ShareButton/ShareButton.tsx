import React, { useState, useEffect } from 'react';
import {
    Button,
    Spinner,
    useToast,
    useClipboard,
    IButton,
} from '@chakra-ui/core';
import { postSpoilerLog } from '../../api/postSpoilerLog';

interface ShareButtonProps {
    size?: IButton['size'];
}

const ShareButton = ({ size = undefined }: ShareButtonProps) => {
    const [isLoading, setIsLoading] = useState(false),
        [shareLink, setShareLink] = useState<string>(),
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
                onCopy?.();
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
                            onCopy?.();
                        } else {
                            handleError();
                        }
                    })
                    .catch(handleError)
                    .finally(() => setIsLoading(false));
            }
        };

    return (
        <Button onClick={handleClick} isDisabled={isLoading} size={size}>
            {isLoading ? (
                <Spinner size={size} />
            ) : (
                <i className="fas fa-link" />
            )}
            &nbsp;{isLoading ? 'Generating...' : 'Copy Share Link'}
        </Button>
    );
};

export { ShareButton };
