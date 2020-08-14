import axios from 'axios';

export interface APIResponse {
    data?: { [key: string]: any } | string;
    isSuccessful: boolean;
    message?: string;
}

export const apiRoot = axios.create({
    baseURL: process.env?.REACT_APP_API_ENDPOINT ?? '',
});
