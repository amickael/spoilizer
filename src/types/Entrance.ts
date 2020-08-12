export interface Entrance {
    entrance: string;
    destination: string;
    origin?: string;
}

export interface EntranceSphere {
    sphere: number;
    entrances: Entrance[];
}
