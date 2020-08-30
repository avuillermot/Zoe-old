import PDFDocument from 'pdfkit';
import fs from 'fs';
import Invoice from '../invoice/invoice';

export default class DefaultInvoice {
    
    document:any;

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

        this.generateFooter(invoice);
        this.document.end();
    }

    /*public async generateCustomerInformation(invoice):void {
        const shipping = invoice.shipping;

        document
            .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
            .text(`Invoice Date: ${new Date()}`, 50, 215)
            .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)

            .text(shipping.name, 300, 200)
            .text(shipping.address, 300, 215)
            .text(`${shipping.city}, ${shipping.state}, ${shipping.country}`, 300, 130)
            .moveDown();
    }*/

    public async generateHeader(invoice: Invoice): Promise<void> {
        let x: number = 70;
        let y: number = 50;
        let interval: number = 11;

        // provider part
        this.document
            //.image("logo.png", 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(12)
            .text(invoice.providerName, 70, y)
            .fontSize(10);
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

        // invoice details part
        x = 300;
        y = 100;
        this.document.text(invoice.invoiceNumber, x, y);
        y = y + interval;
        this.document.text(invoice.invoiceDate, x, y);
        y = y + interval;
        if (invoice.deliveryDate != null) {
            this.document.text(invoice.deliveryDate, x, y);
            y = y + interval;
        }
        this.document.moveDown();
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