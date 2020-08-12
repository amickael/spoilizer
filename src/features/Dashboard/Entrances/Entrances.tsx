import React from 'react';
import { EntranceList } from '../../../components/EntranceList';
import { Entrance } from '../../../types/Entrance';

interface EntrancesProps {
    entranceList: Entrance[];
    hideSpoilers?: boolean;
}

const Entrances = ({ entranceList, hideSpoilers = false }: EntrancesProps) => {
    return (
        <EntranceList
            title="Entrances"
            entranceList={entranceList}
            hideSpoilers={hideSpoilers}
        />
    );
};

export { Entrances };
