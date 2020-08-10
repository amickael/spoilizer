import React from 'react';
import { SpoilerList } from '../../../components/SpoilerList';
import { Spoiler } from '../../../types/spoilerLog';

interface WayOfTheHeroProps {
    spoilerList: Spoiler[];
}

const WayOfTheHero = ({ spoilerList }: WayOfTheHeroProps) => {
    return <SpoilerList title="Way of the Hero" spoilerList={spoilerList} />;
};

export { WayOfTheHero };
