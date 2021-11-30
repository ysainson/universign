import { BaseObject } from "../BaseObject";

export enum RegistrationRequestType {
    /**
     * French ID card. **Two** ID documents should be provided.
     */
    ID_CARD_FR = 'id_card_fr',
    /**
     * French Passport. Only **one** ID document should be provided.
     */
    PASSPORT_EU = 'passport_eu',
    /**
     * Residence Permit. **Two** ID documents should be provided.
     */
    RESIDENCE_PERMIT = 'titre_sejour'
}

/**
 * The `RegistrationRequest` data structure contains information for the signer registration.
 */
interface IRegistrationRequest {
    /**
     * List of ID documents to use to register the signer.
     * The number of these documents is indicated in the following comment.
     */
    documents: Buffer[];
    /**
     * The type of the provided ID documents.
     */
    type: RegistrationRequestType;
}

/**
 * Class representing a {@link IRegistrationRequest}.
 */
export class RegistrationRequest extends BaseObject<IRegistrationRequest> implements IRegistrationRequest {
    readonly documents: Buffer[];
    readonly type: RegistrationRequestType;

    /**
     * Create a new instance of a `RegistrationRequest`.
     * @constructor
     * @param {IRegistrationRequest} registrationRequest
     */
    constructor(registrationRequest: IRegistrationRequest) {
        super(registrationRequest);
        this.documents = registrationRequest.documents;
        this.type = registrationRequest.type;
    }
}
