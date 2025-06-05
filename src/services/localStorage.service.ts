
const  store  = (key:string, value:any) => {
    localStorage[key] = JSON.stringify(value);
}

const  load = (key:string, defaultValue = null) => {
    const value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}
export const localStorageService = {
    store,
    load
}
