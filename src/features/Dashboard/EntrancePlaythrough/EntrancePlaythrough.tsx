import React from 'react';
import { Box } from '@chakra-ui/core';
import { EntranceSphere } from '../../../types/spoilerLog';
import { EntranceList } from '../../../components/EntranceList';

export interface EntrancePlaythroughProps {
    entranceSpheres: EntranceSphere[];
}

const EntrancePlaythrough = ({ entranceSpheres }: EntrancePlaythroughProps) => {
    return (
        <React.Fragment>
            {entranceSpheres.map((sphere, i) => (
                <Box key={i} paddingY="0.5em">
                    <EntranceList
                        title={`Sphere ${sphere.sphere}`}
                        entranceList={sphere.entrances}
                        hideSearch
                    />
                </Box>
            ))}
        </React.Fragment>
    );
};

export { EntrancePlaythrough };
