class DataService {
    constructor() {
        if (!DataService._instance) {
            DataService._instance = this;
        }
        return DataService._instance;
    }
    async getData(genderParam = 'all', countParam = 1) {
        let url = new URL('https://randomuser.me/api/');
        let params = { gender: genderParam, results: countParam };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url).then((data) => data.json());
    }
}