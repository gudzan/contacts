import httpService from "./httpService";

const professionEndpoint = "profession/";

const professionService = {
    get: async (id) => {
        const { data } = await httpService.get(professionEndpoint + id);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(professionEndpoint);
        return data;
    }
};

export default professionService;