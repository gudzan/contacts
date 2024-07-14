import httpService from "./httpService";

const qualityEndpoint = "quality/";

const qualityService = {
    get: async (id) => {
        const { data } = await httpService.get(qualityEndpoint + id);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    }
};

export default qualityService;