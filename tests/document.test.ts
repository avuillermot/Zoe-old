import "./../src/config"
import { expect } from 'chai';
import "mocha";
import Pdf from "./../src/document/pdf/pdf.serv";
import ServiceInvoice from "./../src/document/invoice/default.serv";
import Invoice from "./../src/document/invoice/invoice.document";
import moment from "moment";

describe('Simple test must signed PDF', () => {

    /*it('should return PDF as array byte', async () => {
        let query:Pdf = new Pdf();
        const document = await query.sign([]);
        expect(document.data.data.length).greaterThan(0);
    });*/

    it('should create a invoice', async () => {
        let query: ServiceInvoice = new ServiceInvoice();
        let invoice: Invoice = new Invoice();

        invoice.providerName = "AVU Corp.";
        invoice.providerZipCode = "69380";
        invoice.providerAddress1 = "8 allée des noisetiers";
        invoice.providerAddress2 = "bib";
        invoice.providerAddress3 = "adresse 3"
        invoice.providerCity = "Lissieu";
        invoice.providerCountry = "FRANCE";
        invoice.providerEmail = "test@bob.com";
        invoice.providerPhone = "0385421423";

        invoice.customerName = "Kuehne+Nagel";

        invoice.invoiceZipCode = "21160";
        invoice.invoiceAddress1 = "7 impasse Henri Lapostolet";
        invoice.invoiceAddress2 = "adresse 2";
        invoice.invoiceAddress3 = "adresse 3";
        invoice.invoiceCity = "Perrigny-les-Dijon";
        invoice.invoiceCountry = "FRANCE";

        invoice.customerZipCode = "21160";
        invoice.customerAddress1 = "7 impasse Henri Lapostolet";
        invoice.customerAddress2 = "adresse 2";
        invoice.customerAddress3 = "adresse 3";
        invoice.customerCity = "Perrigny-les-Dijon";
        invoice.customerCountry = "FRANCE";

        invoice.invoiceNumber = "Facture numero : INV01";
        invoice.invoiceDate = "Emise le  : " + moment().utc().format("L");
        invoice.deliveryDate = "Date de la vente : " + moment().utc().format("L");

        const document = await query.create(invoice);
    });
});