const serverRoot = 'http://127.0.0.1:3001';

export const articalList = serverRoot + '/artical/list';

export const articalListByType = () => {
    return serverRoot + '/artical/list/type';
};

export const articalListBySite = () => {
    return serverRoot + '/artical/list/site';
};

export const articalListByTitle = (title) => {
    return serverRoot + '/artical/list/title' + title;
};

export const articalDetail = (id) => {
    return serverRoot + '/artical/detail/' + id;
};