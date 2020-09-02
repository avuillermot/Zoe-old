import PDFDocument from 'pdfkit';
import fs from 'fs';
import Invoice from '../invoice/invoice.document';

export default class DefaultInvoice {
    
    document: any;
    margeX: number = 50;
    width: number = 610;
    defaultFont: string = "Helvetica";
    defaultFontBold: string = "Helvetica-Bold";

    public constructor() {
        this.document = new PDFDocument();
    }

    public async create(invoice:Invoice):Promise<void> {
       
        this.document.pipe(fs.createWriteStream('output.pdf'));
        this.generateHeader(invoice);
        /*doc
            .fontSize(25)
            .text('Some text with an embedded font!', 100, 100);*/

        /*let y = 10;
        for (let i = 0; i < 10; i++) {
            doc
                .fontSize(10)
                .text("c1", 50, y)
                .text("c2", 150, y)
                .text("c3", 280, y, { width: 90, align: "right" })
                .text("c4", 370, y, { width: 90, align: "right" })
                .text("c5", 0, y, { align: "right" });
        }*/


        this.document.moveTo(this.margeX, 200).lineTo(this.width - this.margeX, 200).fill('#000000');

        this.generateFooter(invoice);
        this.document.moveDown();
        this.document.end();
    }

    public async generateHeader(invoice: Invoice): Promise<void> {
        this.generateHeaderProviderPart(invoice);
        this.generateInvoiceAddressPart(invoice);
        this.generateCustomerAddressPart(invoice);
        this.generateHeaderInvoiceReference(invoice);
    }

    public async generateHeaderProviderPart(invoice: Invoice): Promise<void> {
        let x: number = this.margeX;
        let y: number = 50;
        let interval: number = 11;

        // provider part
        this.document
            .fontSize(8)
            .text(invoice.providerName, x, y)
        y = y + interval;

        this.document.text(invoice.providerAddress1, x, y);
        y = y + interval;

        if (invoice.providerAddress2 != "") {
            this.document.text(invoice.providerAddress2, x, y);
            y = y + interval;
        }
        if (invoice.providerAddress3 != "") {
            this.document.text(invoice.providerAddress3, x, y);
            y = y + interval;
        }
        this.document.text(invoice.providerZipCode + ", " + invoice.providerCity, x, y);
        y = y + interval;
        if (invoice.providerCountry != "") {
            this.document.text(invoice.providerCountry, x, y);
            y = y + interval;
        }

        y = y + interval;

        if (invoice.providerEmail != "") {
            this.document.text(invoice.providerEmail, x, y);
            y = y + interval;
        }

        if (invoice.providerPhone != "") {
            this.document.text(invoice.providerPhone, x, y);
            y = y + interval;
        }
    }

    public async generateInvoiceAddressPart(invoice: Invoice): Promise<void> {
        let x: number = this.margeX + 220;
        let y: number = 100;
        let interval: number = 11;

        this.document.fontSize(8).text(invoice.invoiceLabel, x, y, {underline: true});
        y = y + interval;

        this.document.text(invoice.customerName, x, y)
        y = y + interval;

        this.document.text(invoice.invoiceAddress1, x, y);
        y = y + interval;

        if (invoice.invoiceAddress2 != "") {
            this.document.text(invoice.invoiceAddress2, x, y);
            y = y + interval;
        }
        if (invoice.invoiceAddress3 != "") {
            this.document.text(invoice.invoiceAddress3, x, y);
            y = y + interval;
        }
        this.document.text(invoice.invoiceZipCode + ", " + invoice.invoiceCity, x, y);
        y = y + interval;
        if (invoice.invoiceCountry != "") {
            this.document.text(invoice.invoiceCountry, x, y);
            y = y + interval;
        }
    }

    public async generateCustomerAddressPart(invoice: Invoice): Promise<void> {
        let x: number = this.margeX + 350;
        let y: number = 100;
        let interval: number = 11;

        this.document.fontSize(8).text(invoice.customerLabel, x, y, { underline: true });
        y = y + interval;

        this.document.text(invoice.customerName, x, y)
        y = y + interval;

        this.document.text(invoice.customerAddress1, x, y);
        y = y + interval;

        if (invoice.customerAddress2 != "") {
            this.document.text(invoice.customerAddress2, x, y);
            y = y + interval;
        }
        if (invoice.customerAddress3 != "") {
            this.document.text(invoice.customerAddress3, x, y);
            y = y + interval;
        }
        this.document.text(invoice.customerZipCode + ", " + invoice.customerCity, x, y);
        y = y + interval;
        if (invoice.customerCountry != "") {
            this.document.text(invoice.customerCountry, x, y);
            y = y + interval;
        }
    }

    public async generateHeaderInvoiceReference(invoice:Invoice):Promise<void> {

        let x: number = this.margeX + 350;
        let y: number = 50;
        let interval: number = 11;

        this.document.fontSize(8).font(this.defaultFontBold).text(invoice.invoiceNumber, x, y).font(this.defaultFont);
        y = y + interval;
        this.document.text(invoice.invoiceDate, x, y);
        y = y + interval;
        if (invoice.deliveryDate != null) {
            this.document.text(invoice.deliveryDate, x, y);
            y = y + interval;
        }
    }

    public async generateFooter(invoice:Invoice):Promise<void> {
        this.document
            .fontSize(10)
            .text(
                "Payment is due within 15 days. Thank you for your business.",
                50,
                700,
                { align: "center", width: 500 }
            );
    }
}