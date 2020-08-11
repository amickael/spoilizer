import React from 'react';
import { ItemList } from '../../../components/ItemList';
import { Item } from '../../../types/spoilerLog';

interface AllItemsProps {
    spoilerList: Item[];
}

const AllItems = ({ spoilerList }: AllItemsProps) => {
    return <ItemList title="All Items" spoilerList={spoilerList} />;
};

export { AllItems };
