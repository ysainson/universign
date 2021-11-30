import { BaseObject } from "../BaseObject";

import { IdDocument } from './IdDocument';
import { PersonalInfo} from './PersonalInfo';
import { ValidatorResultStatus } from './ValidatorResult';

type ValidationRequestCallbackParams = {
    /**
     * The callback URL.
     */
    url: string;
    /**
     * Validation session identifier.
     */
    id: string;
    /**
     * Validation session status.
     */
    status: ValidatorResultStatus;
}

/**
 * The `ValidationRequest` data structure contains the data needed to be sent in order to launch a validation session.
 */
interface IValidationRequest {
    /**
     * The ID documents.
     */
    idDocument: IdDocument;
    /**
     * The Personal info to be compared with the ID document.
     */
    personalInfo: PersonalInfo;
    /**
     * Whether to allow manual validation or not.
     */
    allowManual?: boolean;
    /**
     * The callback URL to be requested, once the validation session is completed (i.e. its status is VALID or INVALID).
     *
     * **`GET`** request will be performed.
     */
    callbackURL?: string;
}

/**
 * Class representing a {@link IValidationRequest}.
 */
export class ValidationRequest extends BaseObject<IValidationRequest> implements IValidationRequest {
    readonly idDocument: IdDocument;
    readonly personalInfo: PersonalInfo;

    /**
     * Create a new instance of a `ValidationRequest`.
     * @constructor
     * @param {IValidationRequest} validationRequest
     */
    constructor(validationRequest: IValidationRequest) {
        super(validationRequest);
        this.idDocument = validationRequest.idDocument;
        this.personalInfo = validationRequest.personalInfo;
    }
}
