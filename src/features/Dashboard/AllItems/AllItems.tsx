import React from 'react';
import { SpoilerList } from '../../../components/SpoilerList';
import { Spoiler } from '../../../types/spoilerLog';

interface AllItemsProps {
    spoilerList: Spoiler[];
}

const AllItems = ({ spoilerList }: AllItemsProps) => {
    return <SpoilerList title="All Items" spoilerList={spoilerList} />;
};

export { AllItems };
