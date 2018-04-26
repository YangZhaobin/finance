const serverRoot = 'http://127.0.0.1:3001';
// const serverRoot = 'http://47.94.1.113';

export const articalList = serverRoot + '/artical/list';

export const articalListByType = () => {
    return serverRoot + '/artical/list/type';
};

export const articalListBySite = () => {
    return serverRoot + '/artical/list/site';
};

export const articalListByTitle = () => {
    return serverRoot + '/artical/list/title';
};

export const articalDetail = (id) => {
    return serverRoot + '/artical/detail/' + id;
};

export const hotArticalTags = () => {
    return serverRoot + '/tags/list';
};