export default class DefaultInvoice {
    invoiceDate: Date|null = null;
    invoiceNumber: string = "";
    deliveryDate: Date|null = null;

    customerName: string = "";
    customerAddress1: string = "";
    customerAddress2: string = "";
    customerAddress3: string = "";
    customerZipCode: string = "";
    customerCity: string = "";
    customerCountry: string = "";

    providerId1: string = "";
    providerId2: string = "";
    providerId3: string = "";

    providerName: string = "";
    providerAddress1: string = "";
    providerAddress2: string = "";
    providerAddress3: string = "";
    providerZipCode: string = "";
    providerCity: string = "";
    providerCountry: string = "";
}