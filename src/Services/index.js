import axios from 'axios';

const ApiService = {
    api : axios.create({
        baseURL: 'https://api.covid19api.com/'
    }),
    
    async GetCountries() {
        return await this.api.get('summary');
    }
};

export default ApiService;