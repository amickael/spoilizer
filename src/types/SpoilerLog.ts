import { Item, PlaythroughSphere } from './Item';
import { Entrance, EntranceSphere } from './Entrance';
import { Settings } from './Settings';

export interface SpoilerLog {
    seed: string;
    settings: Settings;
    settingsString: string;
    items: Item[];
    woth: Item[];
    playthrough: PlaythroughSphere[];
    entrances: Entrance[];
    entrancePlaythrough: EntranceSphere[];
    world?: string;
}
