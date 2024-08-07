import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import configuration from "../../config.json";

axios.defaults.baseURL = configuration.fireBaseEndpoint;

axios.interceptors.request.use(
    function (config) {
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

axios.interceptors.response.use(
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
    return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
export default httpService;
