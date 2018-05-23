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

export const userLogin = () => {
    return serverRoot + '/user/login';
};

export const userCheck = () => {
    return serverRoot + '/user/get';
};

export const userUpdate = () => {
    return serverRoot + '/user/update';
};

export const userSignup = () => {
    return serverRoot + '/user/add';
};

export const userCollectionList = () => {
    return serverRoot + '/user/collection';
};

export const userCollectionAdd = () => {
    return serverRoot + '/user/collection/add';
};

export const userCollectionDelete = () => {
    return serverRoot + '/user/collection/delete';
};

export const websiteInfos = () => {
    return serverRoot + '/website';
};

export const websiteTags = () => {
    return serverRoot + '/artical/weblist/type';
};

export const hotArticalTagsWithPage = () => {
    return serverRoot + '/tags/list_page';
};