export interface Item {
    location: string;
    item: string;
    price?: number;
    model?: string;
    player?: number;
}

export interface PlaythroughSphere {
    sphere: number;
    items: Item[];
}

export interface Entrance {
    entrance: string;
    destination: string;
    origin?: string;
}

export interface EntranceSphere {
    sphere: number;
    entrances: Entrance[];
}

export interface SpoilerLog {
    seed: string;
    settings: string;
    items: Item[];
    woth: Item[];
    playthrough: PlaythroughSphere[];
    entrances: Entrance[];
    entrancePlaythrough: EntranceSphere[];
    world?: string;
}
