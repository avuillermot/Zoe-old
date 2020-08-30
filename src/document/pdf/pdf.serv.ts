import axios from 'axios';
import settings from '../../config/config.dev'

export default class ServicePdf {
    public async sign(data: []): Promise<any> {
        return await axios({ method: 'get', url: settings.signPdfUrm, params: {} });
    }
}