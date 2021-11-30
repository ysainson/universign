export enum ValidatorResultStatus {
    PendingValidation = 0,
    Valid = 1,
    Invalid = 2
}

export enum ValidatorResultReason {
    /**
     * The document is not fully readable or has been altered.
     */
    Unclear = 1,
    /**
     * The document and the provided information mismatch.
     */
    InformationMismatched = 2,
    /**
     * The document type is not supported.
     */
    UnsupportedType = 3,
    /**
     * The document could not be read.
     */
    Unreadable = 4,
    /**
     * The document is expired.
     */
    Expired = 5
}

type ValidatorResultStructKey = 'firstname' | 'lastname' | 'secondlastname' | 'birthdate';
type ValidatorResultStructValue = {
    /**
     * The expected value.
     */
    expected: string;
    /**
     * The found value.
     */
    found: string;
    /**
     * `true` if the current field is valid, `false` otherwise
     */
    valid: boolean;
}

type ValidatorResultStruct = {
    [p in ValidatorResultStructKey]: ValidatorResultStructValue
}

/**
 * The `ValidatorResult` data structure contains the result of a validation session.
 */
export interface ValidatorResult {
    /**
     * The ID of the validation session.
     */
    id: string;
    /**
     * The status of the validation session.
     */
    status: ValidatorResultStatus;
    /**
     * In case of failure, this fields presents the error number, **null** otherwise.
     */
    reason: ValidatorResultReason | 0;
    /**
     * In case of failure, gives more information about the failure.
     */
    reasonMessage?: string;
    /**
     * In case of failure, this data structure will contain the list of the failing zones, **null** otherwise.
     */
    result: ValidatorResultStruct | {};
}
