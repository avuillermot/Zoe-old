import PDFDocument from 'pdfkit';
import fs from 'fs';
import Invoice from '../invoice/invoice.document';
import ServInvoiceHeader from '../invoice/invoice.document.header.serv';
import ServInvoiceBody from '../invoice/invoice.document.body.serv';
import ServInvoiceFooter from '../invoice/invoice.document.footer';
import ServiceSign from "../../document/pdf/pdf.serv";
import { v4 as uuid } from 'uuid';


export default class DefaultInvoice {
    
    document: any;
    margeX: number = 50;
    width: number = 610;
    defaultFont: string = "Helvetica";
    defaultFontBold: string = "Helvetica-Bold";
    servDocumentHeader: ServInvoiceHeader;
    servDocumentBody: ServInvoiceBody;
    servDocumentFooter: ServInvoiceFooter;

    public pdfRepository: string = "";

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

        this.servDocumentFooter = new ServInvoiceFooter(this.document);
        this.servDocumentFooter.margeX = this.margeX;
        this.servDocumentFooter.width = this.width;
        this.servDocumentFooter.defaultFont = this.defaultFont;
        this.servDocumentFooter.defaultFontBold = this.defaultFontBold;
    }

    public async create(invoice: Invoice): Promise<{ id: string, hasError: boolean }> {
        return await this.createSigned(invoice, false); 
    }

    public async createSigned(invoice: Invoice, signed: boolean): Promise<{ id: string, hasError: boolean }> {

        let hasError = false;
        let id = uuid();
        let path = this.pdfRepository + id + ".pdf";
        this.document.pipe(fs.createWriteStream(path));
        this.generateHeader(invoice);

        this.document.moveTo(this.margeX, 200).lineTo(this.width - this.margeX, 200).fill('#000000');

        this.servDocumentBody.generateTitle(invoice);
        this.servDocumentBody.generateDetails(invoice);

        this.document.moveTo(this.margeX, 230).lineTo(this.width - this.margeX, 230).fill('#000000');

        this.servDocumentFooter.generateFooter(invoice);

        this.generateFooter(invoice);
        this.document.moveDown();
        this.document.end();

        if (signed) {
            let servSign = new ServiceSign();
            hasError = !await servSign.sign(id);
        }

        if (hasError) {
            fs.unlink(path, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted! : ' + path);
            }); 
        }
        
        return { id: id, hasError: hasError };
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