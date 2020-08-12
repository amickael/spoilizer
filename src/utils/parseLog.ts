import * as yup from 'yup';
import * as schema from '../schema';
import { SpoilerLog } from '../types/SpoilerLog';
import { Item } from '../types/Item';
import camelCase from 'lodash/camelCase';
import { Settings } from '../types/Settings';

/* ---------------------------------------------------------------------------------------------------------------------
Utils
--------------------------------------------------------------------------------------------------------------------- */
const makeMulti = (baseSchema = schema.item) => {
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
        settings: schema.settings,
        ':settings_string': yup.string(),
        locations: schema.item,
        ':woth_locations': schema.item,
        ':playthrough': schema.playthrough,
        entrances: schema.entrance,
        ':entrance_playthrough': schema.entrancePlaythrough,
    }),
    mwLogSchema = yup.object().shape({
        ':seed': yup.string(),
        settings: schema.settings,
        ':settings_string': yup.string(),
        locations: makeMulti(schema.item),
        ':woth_locations': makeMulti(schema.item),
        ':playthrough': schema.playthrough,
        entrances: makeMulti(schema.entrance),
        ':entrance_playthrough': schema.entrancePlaythrough,
    }),
    validationOptions: yup.ValidateOptions = {
        stripUnknown: true,
        recursive: false,
        strict: true,
    };

/* ---------------------------------------------------------------------------------------------------------------------
Main Functions
--------------------------------------------------------------------------------------------------------------------- */
export const parseLog = async (spoilerLog: {
        [key: string]: any;
    }): Promise<SpoilerLog> => {
        // Check if valid MW file
        if ((spoilerLog?.settings?.world_count ?? 0) > 1) {
            throw Error('Invalid log file');
        }

        // Parse
        const source = await logSchema.validate(spoilerLog, validationOptions),
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

        const settings: { [key: string]: any } = {};
        Object.entries((source?.settings as object) ?? {}).forEach(
            ([key, value]) => {
                settings[camelCase(key)] = value;
            }
        );

        return {
            seed: source?.[':seed'] ?? '',
            settings: settings as Settings,
            settingsString: source?.[':settings_string'] ?? '',
            items: locations as Item[],
            woth: essentials as Item[],
            playthrough,
            entrances,
            entrancePlaythrough,
        };
    },
    parseMultiLog = async (spoilerLog: {
        [key: string]: any;
    }): Promise<SpoilerLog[]> => {
        // Check if valid MW file
        if ((spoilerLog?.settings?.world_count ?? 0) < 2) {
            throw Error('Invalid log file');
        }

        // Parse
        const source = await mwLogSchema.validate(
                spoilerLog,
                validationOptions
            ),
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

            const settings: { [key: string]: any } = {};
            Object.entries((source?.settings as object) ?? {}).forEach(
                ([key, value]) => {
                    settings[camelCase(key)] = value;
                }
            );

            logs.push({
                seed: source?.[':seed'] ?? '',
                settings: settings as Settings,
                settingsString: source?.[':settings_string'] ?? '',
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
