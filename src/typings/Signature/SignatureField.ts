import { BaseObject } from "../BaseObject";

/**
 * The `SignatureField` data structure describes the content of a PDF visible signature field.
 * A default Pattern of signature is provided by Universign. This pattern is customizable.
 */
export interface ISignatureField {
    /**
     * The name of the field. If the PDF already contains a named signature field,
     * you can use this parameter instead of giving the coordinates (which will be ignored).
     * If the name of this field does not exist in the document, the given coordinates will be used instead.
     */
    name?: string;
    /**
     * The page on which the field must appear (starting at ’1’ for the first page).
     * Pages are enumerated starting at 1. The value ’-1’ points at the last page.
     */
    page: number;
    /**
     * The field horizontal coordinate on the page.
     */
    x: number;
    /**
     * The field vertical coordinate on the page.
     */
    y: number;
}

/**
 * Class representing a {@link ISignatureField}.
 */
export class SignatureField extends BaseObject<ISignatureField> implements ISignatureField {
    readonly page: number;
    readonly x: number;
    readonly y: number;

    /**
     * Create a new instance of a `SignatureField`.
     * @constructor
     * @param {ISignatureField} signOptions
     */
    constructor(signOptions: ISignatureField) {
        super(signOptions);
        this.page = signOptions.page;
        this.x = signOptions.x;
        this.y = signOptions.y;
    }
}
