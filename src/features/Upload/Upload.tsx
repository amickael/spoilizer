import React, { useRef } from 'react';
import { Button } from '@chakra-ui/core';
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
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
            ((inputRef.current as unknown) as HTMLElement).click();
        },
        handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            const uploadedFile = (e.target.files ?? [])?.[0],
                reader = new FileReader();

            reader.readAsText(uploadedFile);
            reader.onload = () => {
                try {
                    const result = JSON.parse(reader.result as string);
                    parseLog(result).then(onSuccess).catch(onError);
                } catch (e) {
                    onError();
                }
            };
        };

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export { Upload };
