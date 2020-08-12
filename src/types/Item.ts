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
