import { $host } from "./index";

export const getCharacter = async (characterId) => {
    try {
        const { data } = await $host.get(`/api/character/${characterId}`);
        return data;
    } catch (err) {
        console.log(`The problem is caught in getCharacter axios. More: ${err}`);
    };
};