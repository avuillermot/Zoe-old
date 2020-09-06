import PDFDocument from 'pdfkit';
import fs from 'fs';
import Invoice from '../invoice/invoice.document';
import ServInvoiceHeader from '../invoice/invoice.document.header.serv';
import ServInvoiceBody from '../invoice/invoice.document.body.serv';

export default class DefaultInvoice {
    
    document: any;
    margeX: number = 50;
    width: number = 610;
    defaultFont: string = "Helvetica";
    defaultFontBold: string = "Helvetica-Bold";
    servDocumentHeader: ServInvoiceHeader;
    servDocumentBody: ServInvoiceBody;

    public constructor() {
        this.document = new PDFDocument();

        this.servDocumentHeader = new ServInvoiceHeader(this.document);
        this.servDocumentHeader.margeX = this.margeX;
        this.servDocumentHeader.width = this.width;
        this.servDocumentHeader.defaultFont = this.defaultFont;
        this.servDocumentHeader.defaultFontBold = this.defaultFontBold;

        this.servDocumentBody = new ServInvoiceBody(this.document);
        this.servDocumentBody.margeX = this.margeX;
        this.servDocumentBody.width = this.width;
        this.servDocumentBody.defaultFont = this.defaultFont;
        this.servDocumentBody.defaultFontBold = this.defaultFontBold;
    }

    public async create(invoice:Invoice):Promise<void> {
       
        this.document.pipe(fs.createWriteStream('output.pdf'));
        this.generateHeader(invoice);

        this.document.moveTo(this.margeX, 200).lineTo(this.width - this.margeX, 200).fill('#000000');

        this.servDocumentBody.generateTitle(invoice);
        this.servDocumentBody.generateDetails(invoice);

        this.document.moveTo(this.margeX, 230).lineTo(this.width - this.margeX, 230).fill('#000000');

        this.generateFooter(invoice);
        this.document.moveDown();
        this.document.end();
    }

    public async generateHeader(invoice: Invoice): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(invoice);
        this.servDocumentHeader.generateInvoiceAddressPart(invoice);
        this.servDocumentHeader.generateCustomerAddressPart(invoice);
        this.servDocumentHeader.generateHeaderInvoiceReference(invoice);
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