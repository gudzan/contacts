import httpService from "./httpService";

const userEndpoint = "user/";

const userService = {
    get: async (id) => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (user) =>{
        const { data } = await httpService.put(userEndpoint + user._id, user)       
        return data;
    }
};

export default userService;