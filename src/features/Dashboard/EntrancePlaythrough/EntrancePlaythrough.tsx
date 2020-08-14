import React from 'react';
import { Box } from '@chakra-ui/core';
import { EntranceList } from '../../../components/EntranceList';
import { EntranceSphere } from '../../../types/Entrance';

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
                <Box key={i} paddingY={2}>
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
