import React from 'react';
import { Box } from '@chakra-ui/core';
import { EntranceSphere } from '../../../types/spoilerLog';
import { EntranceList } from '../../../components/EntranceList';

export interface EntrancePlaythroughProps {
    entranceSpheres: EntranceSphere[];
    hideSpoilers?: boolean;
}

const EntrancePlaythrough = ({
    entranceSpheres,
    hideSpoilers = false,
}: EntrancePlaythroughProps) => {
    return (
        <React.Fragment>
            {entranceSpheres.map((sphere, i) => (
                <Box key={i} paddingY="0.5em">
                    <EntranceList
                        title={`Sphere ${sphere.sphere}`}
                        entranceList={sphere.entrances}
                        hideSpoilers={hideSpoilers}
                        hideSearch
                    />
                </Box>
            ))}
        </React.Fragment>
    );
};

export { EntrancePlaythrough };
