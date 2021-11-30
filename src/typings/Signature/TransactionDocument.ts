import { BaseObject } from "../BaseObject";

import { DocSignatureField } from './DocSignatureField';
import { SEPAData } from './SEPAData';

export enum TransactionDocumentType {
    /**
     * Makes all `TransactionDocument` members relevant, except for `SEPAData`.
     */
    PDF = 'pdf',
    /**
     * This value marks the document as view only.
     */
    PDF_FOR_PRESENTATION = 'pdf-for-presentation',
    /**
     * This type of PDF document can be refused and not signed by any signer without canceling the transaction.
     */
    PDF_OPTIONAL = 'pdf-optional',
    /**
     * Using this value, no PDF document is provided,
     * but UNIVERSIGN creates a SEPA mandate from data sent in `SEPAData`, which becomes the single relevant member.
     */
    SEPA = 'sepa',
}

/**
 * The TransactionDocument data structure contains information about a transaction document.
 */
interface ITransactionDocument {
    /**
     * A unique identifier of this document.
     */
    id: string;
    /**
     * This `TransactionDocument` type.
     * @default {@link PDF}
     */
    documentType?: TransactionDocumentType;
    /**
     * The raw content of the PDF document.
     * You can provide the document using the `url` field, otherwise this field is **mandatory**.
     */
    content?: Buffer;
    /**
     * The URL to download the PDF document. Note that this field is **mandatory** if the `content` is not set.
     */
    url?: string;
    /**
     * The file name of this document.
     */
    fileName: string;
    /**
     * A description of a visible PDF signature field.
     */
    signatureFields?: DocSignatureField[];
    /**
     * Texts of the agreement checkboxes.
     * The last one should be the text of the checkbox related to signature fields labels agreement.
     * This attribute should not be used with documents of the type {@link PDF_FOR_PRESENTATION}.
     * Since agreement for {@link PDF_FOR_PRESENTATION} is not customisable.
     */
    checkBoxTexts?: string[];
    /**
     * This structure can only contain simple types like integer, string or date.
     */
    metaData?: object;
    /**
     * A title to be used for display purpose.
     */
    title?: string;
    /**
     * A structure containing data to create a SEPA mandate PDF.
     */
    SEPAData?: SEPAData;
}

/**
 * Class representing a {@link ITransactionDocument}.
 */
export class TransactionDocument extends BaseObject<ITransactionDocument> implements ITransactionDocument {
    readonly id: string;
    readonly fileName: string;

    /**
     * Create a new instance of a `TransactionDocument`.
     * @constructor
     * @param {ITransactionDocument} transactionDocument
     */
    constructor(transactionDocument: ITransactionDocument) {
        super(transactionDocument);
        this.id = transactionDocument.id;
        this.fileName = transactionDocument.fileName;
    }
}
