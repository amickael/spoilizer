export interface Item {
    location: string;
    item: { item: string; price?: number; model?: string };
}

export interface PlaythroughStep {
    stepNum: number;
    items: Item[];
}

export interface Entrance {
    entrance: string;
    destination: string;
    origin?: string;
}

export interface SpoilerLog {
    seed: string;
    settings: string;
    items: Item[];
    woth: Item[];
    playthrough: PlaythroughStep[];
    entrances: Entrance[];
}
