
const serverRoot = 'http://127.0.0.1:3001'



export const articalList = serverRoot + '/artical/list'

export const articalListByType = (type) => {
    return serverRoot + '/artical/type' + type;
}

export const articalListBySite = (web) => {
    return serverRoot + '/artical/site' + type;
}

export const articalListByTitle = (title) => {
    return serverRoot + '/artical/title' + title;
}

export const articalDetail = (id) => {
    return serverRoot + '/artical/detail/' + id;
}



