import { $authHost, $host } from "./index";

export const getCharacter = async (characterId) => {
    try {
        const { data } = await $host.get(`/api/character/${characterId}`);
        return data;
    } catch (err) {
        console.log(`The problem is caught in getCharacter axios. More: ${err}`);
    };
};

export const createCharacter = async (characterData) => {
    try {
        await $authHost.post(`/api/character/`,
            {
                ...characterData,
            }
        );
        return;
    } catch (err) {
        console.log(`The problem is caught in createCharacter axios. More: ${err}`);
    };
};

export const changeCharacter = async (characterData) => {
    const characterId = characterData.id;
    try {
        await $authHost.put(`/api/character/${characterId}`,
            {
                ...characterData,
            }
        );
        return;
    } catch (err) {
        console.log(`The problem is caught in changeCharacter axios. More: ${err}`);
    };
};