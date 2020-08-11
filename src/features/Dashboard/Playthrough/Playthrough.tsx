import React from 'react';
import { Box } from '@chakra-ui/core';
import { PlaythroughStep } from '../../../types/spoilerLog';
import { ItemList } from '../../../components/ItemList';

export interface PlaythroughProps {
    playthroughSteps: PlaythroughStep[];
}

const Playthrough = ({ playthroughSteps }: PlaythroughProps) => {
    return (
        <React.Fragment>
            {playthroughSteps.map((step, i) => (
                <Box key={i} paddingY="0.5em">
                    <ItemList
                        title={`Sphere ${step.stepNum}`}
                        spoilerList={step.items}
                        hideSearch
                    />
                </Box>
            ))}
        </React.Fragment>
    );
};

export { Playthrough };
