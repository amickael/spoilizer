import React from 'react';
import { ItemList } from '../../../components/ItemList';
import { Item } from '../../../types/spoilerLog';

interface WayOfTheHeroProps {
    spoilerList: Item[];
}

const WayOfTheHero = ({ spoilerList }: WayOfTheHeroProps) => {
    return <ItemList title="Way of the Hero" spoilerList={spoilerList} />;
};

export { WayOfTheHero };
