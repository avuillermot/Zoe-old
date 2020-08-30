import "./../src/config"
import { expect } from 'chai';
import "mocha";
import Pdf from "./../src/document/pdf/pdf.serv";
import ServiceInvoice from "./../src/document/invoice/default.serv";
import Invoice from "./../src/document/invoice/invoice";

describe('Simple test must signed PDF', () => {

    it('should return PDF as array byte', async () => {
        let query:Pdf = new Pdf();
        const document = await query.sign([]);
        expect(document.data.data.length).greaterThan(0);
    });

    it('should create a invoice', async () => {
        let query: ServiceInvoice = new ServiceInvoice();
        let invoice: Invoice = new Invoice();

        invoice.providerName = "AVU Corp.";
        invoice.providerZipCode = "69380";
        invoice.providerAddress1 = "8 allée des noisetiers";
        invoice.providerAddress2 = "bib";
        invoice.providerCity = "Lissieu";
        invoice.providerCountry = "FRANCE";

        invoice.invoiceNumber = "INV01";

        const document = await query.create(invoice);
    });
});