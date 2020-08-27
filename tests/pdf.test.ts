import "./../src/config"
import { expect } from 'chai';
import "mocha";
import Query from "./../src/pdf/pdf.serv";

describe('Simple test must signed PDF', () => {

    it('should return PDF as array byte', async () => {
        let query:Query = new Query();
        const data = await query.sign([]);
        console.log(data);
        //expect(data.length).greaterThan(0);
    });
});