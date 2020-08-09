export interface Spoiler {
    location: string;
    item: { item: string; price?: number; model?: string };
}

export interface PlaythroughStep {
    stepNum: number;
    items: Spoiler[];
}

export interface SpoilerLog {
    seed: string;
    settings: string;
    locations: Spoiler[];
    essentials: Spoiler[];
    playthrough: PlaythroughStep[];
}
