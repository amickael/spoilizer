export interface Spoiler {
    location: string;
    item: string | { item: string; price?: number; model?: string };
}

export interface PlaythroughStep {
    stepNum: number;
    items: Spoiler[];
}

export interface SpoilerLog {
    locations: Spoiler[];
    essentials: Spoiler[];
    playthrough: PlaythroughStep[];
}
