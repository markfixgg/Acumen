import axios from "axios";

export const getInitials = function (string) {
    let names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:3001/api',
    // headers: {'X-Custom-Header': 'foobar'}
});

class API {
    async get_by_uid(uid) {
        const response = await instance.get(`/api/users/${uid}`)
        return response.data
    }

    async upload_image(image) {
        // const response = await instance.get(`/api/users/${u`i`d}`)
        // return response.data
    }
}

export const api = new API()