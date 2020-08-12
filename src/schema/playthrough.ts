import * as yup from 'yup';
import itemSchema from './item';

export default yup.lazy((value) => {
    if (typeof value === 'object') {
        const shape: { [key: string]: any } = {};
        Object.keys(value as object).forEach((key) => {
            shape[key] = itemSchema;
        });
        return yup.object().shape(shape);
    } else {
        return yup.mixed().typeError('Invalid playthrough shape');
    }
});
