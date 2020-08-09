import React, { useState, useRef } from 'react';
import { Button, CircularProgress, Icon, Link, Stack } from '@chakra-ui/core';
import { parseLog } from '../../utils/parseLog';
import { SpoilerLog } from '../../types/spoilerLog';

interface UploadProps {
    children?: string;
    onSuccess?: (spoilerLog: SpoilerLog) => void;
    onError?: () => void;
}

const Upload = ({
    children = 'Upload',
    onSuccess = () => null,
    onError = () => null,
}: UploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null),
        [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
            ((inputRef.current as unknown) as HTMLElement).click();
        },
        handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            const uploadedFile = (e.target.files ?? [])?.[0],
                reader = new FileReader();

            setIsLoading(true);
            reader.readAsText(uploadedFile);
            reader.onload = () => {
                try {
                    const result = JSON.parse(reader.result as string);
                    parseLog(result).then(onSuccess).catch(onError);
                } catch (e) {
                    onError();
                } finally {
                    setIsLoading(false);
                }
            };
        };

    if (isLoading) {
        return <CircularProgress size="500%" isIndeterminate color="green" />;
    }

    return (
        <Stack align="center">
            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                accept="application/json"
                onChange={handleUpload}
            />
            <Button size="lg" onClick={handleClick}>
                <i className="fas fa-upload" />
                &nbsp;
                {children}
            </Button>
            <Link
                href="https://wiki.ootrandomizer.com/index.php?title=Frequently_Asked_Questions#How_Do_I_Find_My_Spoiler_Log_Again.3F"
                isExternal
                marginTop="0.5em"
            >
                Where do I find this? <Icon name="external-link" mx="2px" />
            </Link>
        </Stack>
    );
};

export { Upload };
