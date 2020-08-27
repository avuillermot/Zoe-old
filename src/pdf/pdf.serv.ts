import axios from 'axios';

export default class ServicePdf {
    public async sign(data: []): Promise<any> {
        axios({ method: 'get', url: 'http://localhost:63047/api/pdfsign', params: {} });
    }
}