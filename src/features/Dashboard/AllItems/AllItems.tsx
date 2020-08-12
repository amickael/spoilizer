import React from 'react';
import { ItemList } from '../../../components/ItemList';
import { Item } from '../../../types/Item';

interface AllItemsProps {
    itemList: Item[];
    hideSpoilers?: boolean;
}

const AllItems = ({ itemList, hideSpoilers = false }: AllItemsProps) => {
    return (
        <ItemList
            title="All Items"
            itemList={itemList}
            hideSpoilers={hideSpoilers}
        />
    );
};

export { AllItems };
