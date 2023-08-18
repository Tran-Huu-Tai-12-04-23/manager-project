import axios from 'axios';

class Service {
    constructor() {
        this.url = 'http://localhost:3000';
    }

    getUrlImageServer(path) {
        return this.url + path;
    }
    async callApi(link, data) {
        link = this.url + link;
        try {
            const response = await axios.post(link, data);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async getDataFromApi(link, params = '') {
        link = this.url + link + params;

        try {
            const response = await axios.get(link);
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async update(link, data) {
        link = this.url + link;
        try {
            const response = await axios.put(link, data);
            return response;
        } catch (error) {
            return null;
        }
    }
    async remove(link, query = '') {
        const url = this.url + link + query;
        try {
            const response = await axios.delete(url);
            return response.data;
        } catch (error) {
            return null;
        }
    }
}

export default new Service();
