import * as yup from 'yup';
import { SpoilerLog, Spoiler } from '../types/spoilerLog';

export const spoiler = yup.lazy((value) => {
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
    logSchema = yup.object().shape({
        locations: spoiler,
        ':woth_locations': spoiler,
        ':playthrough': yup.lazy((value) => {
            if (typeof value === 'object') {
                const shape: { [key: string]: any } = {};
                Object.keys(value as object).forEach((key) => {
                    shape[key] = spoiler;
                });
                return yup.object().shape(shape);
            } else {
                return yup.mixed().typeError('Invalid playthrough shape');
            }
        }),
    });

export const parseLog = async (spoilerLog: object): Promise<SpoilerLog> => {
    const source = await logSchema.validate(spoilerLog, { stripUnknown: true }),
        locations = Object.entries(source?.locations ?? {}).map(
            ([location, item]) => ({
                location,
                item,
            })
        ),
        essentials = Object.entries(source?.[':woth_locations'] ?? {}).map(
            ([location, item]) => ({
                location,
                item,
            })
        ),
        playthrough = Object.entries(source?.[':playthrough']).map(
            ([stepNum, spoiler]) => ({
                stepNum: parseInt(stepNum),
                items: Object.entries(spoiler as object).map(
                    ([location, item]) => ({
                        location,
                        item,
                    })
                ),
            })
        );

    return {
        locations: locations as Spoiler[],
        essentials: essentials as Spoiler[],
        playthrough,
    };
};
