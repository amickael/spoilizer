import React from 'react';
import { ItemList } from '../../../components/ItemList';
import { Item } from '../../../types/spoilerLog';

interface WayOfTheHeroProps {
    itemList: Item[];
}

const WayOfTheHero = ({ itemList }: WayOfTheHeroProps) => {
    return <ItemList title="Way of the Hero" itemList={itemList} />;
};

export { WayOfTheHero };
