export const state = {
    user: {}
};

export const mutations = {
    change(state, {key, value = ''}) {
        state[key] = value;
    },
    changeUserInfo(state, user = {}) {
        state['user'] = {
            // ...state['user'],
            // ...user
            username: user.username
        };
    }
};

// let transformArray2Object = (arr, key = 'id') => {
//     let obj = {};
//     arr.forEach((item, index) => {
//         obj[item[key]] = index;
//     });
//     return obj;
// };