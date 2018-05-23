import axios from '../http';
const urlConfig = require('@/api/urlConfig');
export const getUserInfo = ({commit}) => {
    axios.get(urlConfig.userCheck())
    .then((response) => {
        return response.data;
    })
    .then(({code, ret, err}) => {
        if (code === 200) {
            commit('changeUserInfo', ret);
        }
    });
};

export const changeUserInfo = ({commit}, ret) => {
    commit('changeUserInfo', ret);
};