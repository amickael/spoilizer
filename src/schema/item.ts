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
});
