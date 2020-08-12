import * as yup from 'yup';
import entranceSchema from './entrance';

export default yup.lazy((value) => {
    if (typeof value === 'object') {
        const shape: { [key: string]: any } = {};
        Object.keys(value as object).forEach((key) => {
            shape[key] = entranceSchema;
        });
        return yup.object().shape(shape);
    } else {
        return yup.mixed().typeError('Invalid entrance playthrough shape');
    }
});
