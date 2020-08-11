import * as yup from 'yup';
import { SpoilerLog, Item } from '../types/spoilerLog';

/* ---------------------------------------------------------------------------------------------------------------------
Base Schemas
--------------------------------------------------------------------------------------------------------------------- */
export const items = yup.lazy((value) => {
        if (typeof value === 'object') {
            const shape: { [key: string]: any } = {};
            Object.keys(value as object).forEach((key) => {
                shape[key] = yup.lazy((value) => {
                    switch (typeof value) {
                        case 'string':
                            return yup.string();
                        case 'object':
                            return yup.object().shape({
                                item: yup.string(),
                                price: yup.number().integer().optional(),
                                model: yup.string().optional(),
                                player: yup.number().integer().optional(),
                            });
                        default:
                            return yup.mixed().typeError('Invalid spoiler');
                    }
                });
            });
            return yup.object().shape(shape);
        } else {
            return yup.mixed().typeError('Invalid location shape');
        }
    }),
    entrances = yup.lazy((value) => {
        if (typeof value === 'object') {
            const shape: { [key: string]: any } = {};
            Object.keys(value as object).forEach((key) => {
                shape[key] = yup.lazy((value) => {
                    switch (typeof value) {
                        case 'string':
                            return yup.string();
                        case 'object':
                            return yup.object().shape({
                                region: yup.string(),
                                from: yup.string(),
                            });
                        default:
                            return yup.mixed().typeError('Invalid entrance');
                    }
                });
            });
            return yup.object().shape(shape);
        } else {
            return yup.mixed().typeError('Invalid entrance');
        }
    }),
    playthrough = yup.lazy((value) => {
        if (typeof value === 'object') {
            const shape: { [key: string]: any } = {};
            Object.keys(value as object).forEach((key) => {
                shape[key] = items;
            });
            return yup.object().shape(shape);
        } else {
            return yup.mixed().typeError('Invalid playthrough shape');
        }
    }),
    entrancePlaythrough = yup.lazy((value) => {
        if (typeof value === 'object') {
            const shape: { [key: string]: any } = {};
            Object.keys(value as object).forEach((key) => {
                shape[key] = entrances;
            });
            return yup.object().shape(shape);
        } else {
            return yup.mixed().typeError('Invalid entrance playthrough shape');
        }
    });

/* ---------------------------------------------------------------------------------------------------------------------
Utils
--------------------------------------------------------------------------------------------------------------------- */
const makeMulti = (baseSchema = items) => {
    return yup.lazy((value) => {
        if (typeof value === 'object') {
            const shape: { [key: string]: any } = {};
            Object.keys(value as object).forEach((key) => {
                shape[key] = baseSchema;
            });
            return yup.object().shape(shape);
        } else {
            return yup.mixed().typeError('Invalid world');
        }
    });
};

/* ---------------------------------------------------------------------------------------------------------------------
Log Schemas
--------------------------------------------------------------------------------------------------------------------- */
const logSchema = yup.object().shape({
        ':seed': yup.string(),
        ':settings_string': yup.string(),
        locations: items,
        ':woth_locations': items,
        ':playthrough': playthrough,
        entrances: entrances,
        ':entrance_playthrough': entrancePlaythrough,
    }),
    mwLogSchema = yup.object().shape({
        ':seed': yup.string(),
        ':settings_string': yup.string(),
        locations: makeMulti(items),
        ':woth_locations': makeMulti(items),
        ':playthrough': playthrough,
        entrances: makeMulti(entrances),
        ':entrance_playthrough': entrancePlaythrough,
    });

/* ---------------------------------------------------------------------------------------------------------------------
Main Functions
--------------------------------------------------------------------------------------------------------------------- */
export const parseLog = async (spoilerLog: object): Promise<SpoilerLog> => {
        const source = await logSchema.validate(spoilerLog, {
                stripUnknown: true,
            }),
            locations = Object.entries(source?.locations ?? {}).map(
                ([location, item]) => ({
                    location,
                    item: typeof item === 'string' ? item : (item as any).item,
                    price:
                        typeof item === 'object'
                            ? (item as any)?.price
                            : undefined,
                    model:
                        typeof item === 'object'
                            ? (item as any)?.model
                            : undefined,
                    player:
                        typeof item === 'object'
                            ? (item as any)?.player
                            : undefined,
                })
            ),
            essentials = Object.entries(source?.[':woth_locations'] ?? {}).map(
                ([location, item]) => ({
                    location,
                    item: typeof item === 'string' ? item : (item as any).item,
                    price:
                        typeof item === 'object'
                            ? (item as any)?.price
                            : undefined,
                    model:
                        typeof item === 'object'
                            ? (item as any)?.model
                            : undefined,
                    player:
                        typeof item === 'object'
                            ? (item as any)?.player
                            : undefined,
                })
            ),
            playthrough = Object.entries(source?.[':playthrough'] ?? {}).map(
                ([sphere, spoiler]) => ({
                    sphere: parseInt(sphere),
                    items: Object.entries(spoiler as object).map(
                        ([location, item]) => ({
                            location,
                            item:
                                typeof item === 'string'
                                    ? item
                                    : (item as any).item,
                            price:
                                typeof item === 'object'
                                    ? (item as any)?.price
                                    : undefined,
                            model:
                                typeof item === 'object'
                                    ? (item as any)?.model
                                    : undefined,
                            player:
                                typeof item === 'object'
                                    ? (item as any)?.player
                                    : undefined,
                        })
                    ),
                })
            ),
            entrances = Object.entries(source?.entrances ?? {}).map(
                ([entrance, dest]) => ({
                    entrance: entrance,
                    destination:
                        typeof dest === 'object' ? (dest as any).region : dest,
                    origin:
                        typeof dest === 'object'
                            ? (dest as any).from
                            : undefined,
                })
            ),
            entrancePlaythrough = Object.entries(
                source?.[':entrance_playthrough'] ?? {}
            ).map(([sphere, entrance]) => ({
                sphere: parseInt(sphere),
                entrances: Object.entries(entrance as object).map(
                    ([entrance, dest]) => ({
                        entrance,
                        destination:
                            typeof dest === 'object'
                                ? (dest as any).region
                                : dest,
                        origin:
                            typeof dest === 'object'
                                ? (dest as any).from
                                : undefined,
                    })
                ),
            }));

        return {
            seed: source?.[':seed'] ?? '',
            settings: source?.[':settings_string'] ?? '',
            items: locations as Item[],
            woth: essentials as Item[],
            playthrough,
            entrances,
            entrancePlaythrough,
        };
    },
    parseMultiLog = async (spoilerLog: object): Promise<SpoilerLog[]> => {
        const source = await mwLogSchema.validate(spoilerLog, {
                stripUnknown: true,
            }),
            worlds = Object.keys(source?.locations ?? {}),
            logs: SpoilerLog[] = [];

        worlds.forEach((world) => {
            const locations = Object.entries(
                    source?.locations?.[world] ?? {}
                ).map(([location, item]) => ({
                    location,
                    item: typeof item === 'string' ? item : (item as any).item,
                    price:
                        typeof item === 'object'
                            ? (item as any)?.price
                            : undefined,
                    model:
                        typeof item === 'object'
                            ? (item as any)?.model
                            : undefined,
                    player:
                        typeof item === 'object'
                            ? (item as any)?.player
                            : undefined,
                })),
                essentials = Object.entries(
                    source?.[':woth_locations']?.[world] ?? {}
                ).map(([location, item]) => ({
                    location,
                    item: typeof item === 'string' ? item : (item as any).item,
                    price:
                        typeof item === 'object'
                            ? (item as any)?.price
                            : undefined,
                    model:
                        typeof item === 'object'
                            ? (item as any)?.model
                            : undefined,
                    player:
                        typeof item === 'object'
                            ? (item as any)?.player
                            : undefined,
                })),
                playthrough = Object.entries(
                    source?.[':playthrough'] ?? {}
                ).map(([sphere, spoiler]) => ({
                    sphere: parseInt(sphere),
                    items: Object.entries(spoiler as object).map(
                        ([location, item]) => ({
                            location,
                            item:
                                typeof item === 'string'
                                    ? item
                                    : (item as any).item,
                            price:
                                typeof item === 'object'
                                    ? (item as any)?.price
                                    : undefined,
                            model:
                                typeof item === 'object'
                                    ? (item as any)?.model
                                    : undefined,
                            player:
                                typeof item === 'object'
                                    ? (item as any)?.player
                                    : undefined,
                        })
                    ),
                })),
                entrances = Object.entries(
                    source?.entrances?.[world] ?? {}
                ).map(([entrance, dest]) => ({
                    entrance: entrance,
                    destination:
                        typeof dest === 'object' ? (dest as any).region : dest,
                    origin:
                        typeof dest === 'object'
                            ? (dest as any).from
                            : undefined,
                })),
                entrancePlaythrough = Object.entries(
                    source?.[':entrance_playthrough'] ?? {}
                ).map(([sphere, entrance]) => ({
                    sphere: parseInt(sphere),
                    entrances: Object.entries(entrance as object).map(
                        ([entrance, dest]) => ({
                            entrance,
                            destination:
                                typeof dest === 'object'
                                    ? (dest as any).region
                                    : dest,
                            origin:
                                typeof dest === 'object'
                                    ? (dest as any).from
                                    : undefined,
                        })
                    ),
                }));
            logs.push({
                seed: source?.[':seed'] ?? '',
                settings: source?.[':settings_string'] ?? '',
                items: locations,
                woth: essentials,
                playthrough,
                entrances,
                entrancePlaythrough,
                world: world,
            });
        });

        return logs;
    };
