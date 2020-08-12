import React from 'react';
import { ItemList } from '../../../components/ItemList';
import { Item } from '../../../types/spoilerLog';

interface WayOfTheHeroProps {
    itemList: Item[];
    hideSpoilers?: boolean;
}

const WayOfTheHero = ({
    itemList,
    hideSpoilers = false,
}: WayOfTheHeroProps) => {
    return (
        <ItemList
            title="Way of the Hero"
            itemList={itemList}
            hideSpoilers={hideSpoilers}
        />
    );
};

export { WayOfTheHero };
