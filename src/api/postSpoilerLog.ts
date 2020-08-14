import { apiRoot, APIResponse } from './apiRoot';

export const postSpoilerLog = async (payload: object): Promise<APIResponse> => {
    try {
        const resp = await apiRoot.post('/log', payload);
        if (resp.status === 200) {
            return {
                data: resp.data,
                isSuccessful: true,
            };
        } else {
            return {
                isSuccessful: false,
                message: resp.data.toString(),
            };
        }
    } catch (error) {
        return {
            isSuccessful: false,
            message: error.toString(),
        };
    }
};
