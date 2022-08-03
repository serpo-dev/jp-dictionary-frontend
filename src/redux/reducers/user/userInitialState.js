const initialState = {
    isAuth: false,
    user: {
        id: null,
        login: null,
        email: null,
        password: null,
        role: null,
        lang: 'ru'
    },
    personalInfo: {
        avatarUrl: null,
        status: null,
        surname: null,
        name: null,
        birth: null,
        city: null,
        aboutMe: null
    },
    progress: {
        level: null,
        coins: null
    }
};

export default initialState;