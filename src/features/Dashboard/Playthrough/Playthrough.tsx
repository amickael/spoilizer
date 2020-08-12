import React from 'react';
import { Box } from '@chakra-ui/core';
import { PlaythroughSphere } from '../../../types/spoilerLog';
import { ItemList } from '../../../components/ItemList';

export interface PlaythroughProps {
    playthroughSpheres: PlaythroughSphere[];
    hideSpoilers?: boolean;
}

const Playthrough = ({
    playthroughSpheres,
    hideSpoilers = false,
}: PlaythroughProps) => {
    return (
        <React.Fragment>
            {playthroughSpheres.map((step, i) => (
                <Box key={i} paddingY="0.5em">
                    <ItemList
                        title={`Sphere ${step.sphere}`}
                        itemList={step.items}
                        hideSearch
                        disablePagination
                        hideSpoilers={hideSpoilers}
                    />
                </Box>
            ))}
        </React.Fragment>
    );
};

export { Playthrough };
