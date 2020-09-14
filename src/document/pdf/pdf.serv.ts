import axios from 'axios';
import settings from '../../config/config'

export default class ServicePdf {
    public async sign(id: string): Promise<any> {
        var url = settings.signPdfUrm + "/" + id;

        let back = null;
        try {
            back = await axios.get(url);
            return true;
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
    }
}