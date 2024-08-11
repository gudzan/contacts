import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import configuration from "../../config.json";

const http = axios.create({ baseURL: configuration.fireBaseEndpoint });

http.interceptors.request.use(
    async function (config) {
        if (configuration.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        if (configuration.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            logger.log(error);
            toast.error("Somthing was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id ? Object.keys(data).map((key) => ({ ...data[key] })) : data;
}

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
};

export default httpService;
