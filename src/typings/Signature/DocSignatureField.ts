import { SignatureField, ISignatureField } from './SignatureField';

interface IDocSignatureField extends ISignatureField {
    /**
     * The index of the signer which uses this field. Signers are enumerated starting at 0.
     */
    signerIndex: number;
    /**
     * The name of the pattern. May be used if more than one pattern is set.
     * The magic value "invisible" means that the field will not be visible in the PDF.
     * @default "default"
     */
    patternName?: string;
    /**
     * A label which defines the signature field. This label will be printed in the signature page if set.
     * If a signer has more than one field on the same document, label becomes mandatory.
     */
    label?: string;
    /**
     * The image to be displayed in the signature field, it will replace the default UNIVERSIGN logo.
     * Image format must be JPG, JPEG or PNG. A recommended resolution for this image is 150x36px.
     * The image will be resized if the image has a different resolution.
     */
    image?: Buffer;
}

/**
 * Class representing a {@link IDocSignatureField}.
 */
export class DocSignatureField extends SignatureField implements IDocSignatureField {
    readonly signerIndex: number;

    /**
     * Create a new instance of a `SignatureField`.
     * @constructor
     * @param {IDocSignatureField} docSignatureField
     */
    constructor(docSignatureField: IDocSignatureField) {
        super(docSignatureField);
        this.signerIndex = docSignatureField.signerIndex;
    }
}
