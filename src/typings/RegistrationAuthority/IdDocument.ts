import {BaseObject} from "../BaseObject";

export enum IdDocumentType {
    /**
     * French ID card. **Two** ID documents should be provided.
     */
    ID_CARD_FR = 0,
    /**
     * French Passport. Only **one** ID document should be provided.
     */
    PASSPORT_EU = 1,
    /**
     * Residence Permit. **Two** ID documents should be provided.
     */
    RESIDENCE_PERMIT = 2
}

/**
 * The `IdDocument` data structure contains the ID documents and their type.
 */
interface IIdDocument {
    /**
     * List of ID documents to be validated. The number of these documents is indicated in the following comment.
     * The max size of each photo is 5MB.
     */
    photos: ArrayBuffer[];
    /**
     * The type of the provided ID documents.
     */
    type: IdDocumentType;
}

/**
 * Class representing a {@link IIdDocument}.
 */
export class IdDocument extends BaseObject<IIdDocument> {
    /**
     * Create a new instance of a `IdDocument`.
     * @constructor
     * @param {IIdDocument} idDocument
     */
    constructor(idDocument: IIdDocument) {
        super(idDocument);
    }
}
