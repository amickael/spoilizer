import React from 'react';
import { ItemList } from '../../../components/ItemList';
import { Item } from '../../../types/spoilerLog';

interface AllItemsProps {
    itemList: Item[];
}

const AllItems = ({ itemList }: AllItemsProps) => {
    return <ItemList title="All Items" itemList={itemList} />;
};

export { AllItems };
