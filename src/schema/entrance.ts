import * as yup from 'yup';

export default yup.lazy((value) => {
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
});
