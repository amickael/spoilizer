import React from 'react';
import { EntranceList } from '../../../components/EntranceList';
import { Entrance } from '../../../types/spoilerLog';

interface EntrancesProps {
    entranceList: Entrance[];
}

const Entrances = ({ entranceList }: EntrancesProps) => {
    return <EntranceList title="Entrances" entranceList={entranceList} />;
};

export { Entrances };
