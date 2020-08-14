import { validate as validateUuid } from 'uuid';
import { apiRoot, APIResponse } from './apiRoot';

export const getSpoilerLog = async (logId: string): Promise<APIResponse> => {
    if (validateUuid(logId)) {
        try {
            const resp = await apiRoot.get(`/log/${logId}`);
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
    } else {
        return {
            isSuccessful: false,
            message: 'Invalid ID',
        };
    }
};
