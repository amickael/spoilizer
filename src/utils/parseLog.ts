import * as yup from 'yup';
import { SpoilerLog, Item } from '../types/spoilerLog';

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
    logSchema = yup.object().shape({
        ':seed': yup.string(),
        ':settings_string': yup.string(),
        locations: items,
        ':woth_locations': items,
        ':playthrough': yup.lazy((value) => {
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
        entrances: entrances,
    });

export const parseLog = async (spoilerLog: object): Promise<SpoilerLog> => {
    const source = await logSchema.validate(spoilerLog, { stripUnknown: true }),
        locations = Object.entries(source?.locations ?? {}).map(
            ([location, item]) => ({
                location,
                item: typeof item === 'string' ? { item: item } : item,
            })
        ),
        essentials = Object.entries(source?.[':woth_locations'] ?? {}).map(
            ([location, item]) => ({
                location,
                item: typeof item === 'string' ? { item: item } : item,
            })
        ),
        playthrough = Object.entries(source?.[':playthrough']).map(
            ([stepNum, spoiler]) => ({
                stepNum: parseInt(stepNum),
                items: Object.entries(spoiler as object).map(
                    ([location, item]) => ({
                        location,
                        item: typeof item === 'string' ? { item: item } : item,
                    })
                ),
            })
        ),
        entrances = Object.entries(source?.entrances).map(
            ([entrance, dest]) => ({
                entrance: entrance,
                destination:
                    typeof dest === 'object' ? (dest as any).region : dest,
                origin:
                    typeof dest === 'object' ? (dest as any).from : undefined,
            })
        );

    return {
        seed: source?.[':seed'] ?? '',
        settings: source?.[':settings_string'] ?? '',
        items: locations as Item[],
        woth: essentials as Item[],
        playthrough,
        entrances,
    };
};
