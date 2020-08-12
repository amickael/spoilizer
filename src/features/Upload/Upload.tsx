import React, { useState, useRef } from 'react';
import {
    Button,
    Spinner,
    Icon,
    Link,
    Stack,
    Switch,
    FormLabel,
    Flex,
    Text,
} from '@chakra-ui/core';
import { parseLog, parseMultiLog } from '../../utils/parseLog';
import { SpoilerLog } from '../../types/spoilerLog';

interface UploadProps {
    children?: string;
    onSuccess?: (spoilerLog: SpoilerLog | SpoilerLog[]) => void;
    onError?: () => void;
}

const Upload = ({
    children = 'Upload',
    onSuccess = () => null,
    onError = () => null,
}: UploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null),
        [isLoading, setIsLoading] = useState(false),
        [isMultiworld, setIsMultiworld] = useState(false);

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
                    if (isMultiworld) {
                        parseMultiLog(result).then(onSuccess).catch(onError);
                    } else {
                        parseLog(result).then(onSuccess).catch(onError);
                    }
                } catch (e) {
                    onError();
                } finally {
                    setIsLoading(false);
                }
            };
        };

    if (isLoading) {
        return (
            <Stack align="center" justify="center">
                <Spinner size="xl" thickness="3px" />
                <Text>Processing...</Text>
                {isMultiworld && (
                    <Text fontSize="sm">
                        Multi-world logs may take longer to process
                    </Text>
                )}
            </Stack>
        );
    }

    return (
        <Stack align="center">
            <Flex justify="center" align="center">
                <FormLabel htmlFor="is-multiworld">Multi-World Seed</FormLabel>
                <Switch
                    id="is-multiworld"
                    isChecked={isMultiworld}
                    onChange={() => setIsMultiworld(!isMultiworld)}
                />
            </Flex>
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
                marginTop="1em"
            >
                Where do I find this? <Icon name="external-link" mx="2px" />
            </Link>
        </Stack>
    );
};

export { Upload };
