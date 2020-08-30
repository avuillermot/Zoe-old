import "./../src/config"
import { expect } from 'chai';
import "mocha";
import Pdf from "./../src/document/pdf/pdf.serv";
import Invoice from "./../src/document/invoice/standard";

describe('Simple test must signed PDF', () => {

    it('should return PDF as array byte', async () => {
        let query:Pdf = new Pdf();
        const document = await query.sign([]);
        expect(document.data.data.length).greaterThan(0);
    });

    it('should create a invoice', async () => {
        let query: Invoice = new Invoice();
        const document = await query.create();
    });
});