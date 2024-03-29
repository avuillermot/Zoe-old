import PDFDocument from 'pdfkit';
import Invoice from '../invoice/invoice.document';
import item from '../../item/item';

export default class InvoiceBodyDefault {

    document: any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";

    public constructor(document: any) {
        this.document = document;
    }

    public async generateTitle(invoice: Invoice): Promise<void> {
        this.document.fontSize(8).font(this.defaultFont).text("FACTURE", (this.width / 2) -30, 210);
    }

    public async generateDetails(invoice: Invoice): Promise<void> {

        let baseCol: number = this.width / 4 - 30;
        let col1: number = this.margeX;
        let col2: number = baseCol * 2;
        let col3: number = baseCol * 3;
        let col4: number = baseCol * 4;

        let lineHeight: number = 35;

        for (var i = 0; i < invoice.items.length; i++) {
            let item = invoice.items[i];
            this.document.fontSize(8).font(this.defaultFont)
                .text(item.description.padEnd(190, " "), col1, 230 + ((i + 1) * lineHeight), { width: baseCol * 2 })
                .text(item.price.toString().padStart(12," "), col4, 230 + ((i + 1) * lineHeight))
                .text(item.comment, col3, 230 + ((i + 1) * lineHeight));
        }
    }
}