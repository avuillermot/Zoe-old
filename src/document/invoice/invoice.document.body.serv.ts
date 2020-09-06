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

        let col1: number = this.width / 4 - 30;
        let col2: number = col1 * 2;
        let col3: number = col1 * 3;
        let col4: number = col1 * 4;

        for (var i = 0; i < invoice.items.length; i++) {
            let item = invoice.items[i];
            console.log("item");
            this.document.fontSize(8).font(this.defaultFont)
                .text(item.description, col1, 230 + ((i + 1) * 20))
                .text(item.price, col2, 230 + ((i + 1) * 20))
                .text(item.comment, col3, 230 + ((i + 1) * 20));
        }
    }
}