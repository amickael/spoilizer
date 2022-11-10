import React from 'react';
import { Box } from '@chakra-ui/core';
import { ItemList } from '../../../components/ItemList';
import { PlaythroughSphere } from '../../../types/Item';

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
                <Box key={i} paddingY={2}>
                    <ItemList
                        title={`Sphere ${step.sphere}`}
                        itemList={step.items}
                        hideSearch
                        hideFilter
                        disablePagination
                        hideSpoilers={hideSpoilers}
                    />
                </Box>
            ))}
        </React.Fragment>
    );
};

export { Playthrough };
