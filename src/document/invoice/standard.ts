import PDFDocument from 'pdfkit';
import fs from 'fs';

export default class StandardInvoice {

    public async create() {
        const doc = new PDFDocument();
       
        doc.pipe(fs.createWriteStream('output.pdf'));
        this.generateHeader(doc);
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

        this.generateFooter(doc);
        doc.end();
    }

    public async generateHeader(doc: any):Promise<void> {
        doc
            //.image("logo.png", 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(20)
            .text("ACME Inc.", 110, 57)
            .fontSize(10)
            .text("123 Main Street", 200, 65, { align: "right" })
            .text("New York, NY, 10025", 200, 80, { align: "right" })
            .moveDown();
    }

    public async generateFooter(doc: any):Promise<void> {
        doc
            .fontSize(10)
            .text(
                "Payment is due within 15 days. Thank you for your business.",
                50,
                700,
                { align: "center", width: 500 }
            );
    }
}