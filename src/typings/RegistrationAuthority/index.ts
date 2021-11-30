import { MatchingFilter } from './MatchingFilter';
import { MatchingResult } from './MatchingResult';
import { ValidationRequest } from './ValidationRequest';
import { ValidatorResult } from './ValidatorResult';

export enum OperatorStatus {
    /**
     * The user is not an operator.
     */
    NOT_AN_OPERATOR = 0,
    /**
     * The user is an RA operator.
     */
    RA_OPERATOR = 1,
    /**
     * The user is invited to be an RA operator.
     */
    INVITED_AS_RA_OPERATOR = 2,
    /**
     * The User is not existent.
     */
    USER_NOT_EXIST = 5
}

export enum Method {
    /**
     * Returns users matching the provided filter.
     */
    MatchAccount = 'matcher.matchAccount',
    /**
     * Returns the {@link OperatorStatus}.
     */
    CheckOperatorStatus = 'ra.checkOperatorStatus',
    /**
     * This service allows the admin of an organization to retrieve the signed certificate application agreement
     * of a user (belonging to his organization), identified by his email.
     *
     * This service is limited to organizations having this feature explicitly granted.
     */
    GetCertificateAgreement = 'ra.getCertificateAgreement',
    /**
     * This service allows the admin of an organization to revoke a user’s certificate identified
     * by its emails or phone number.
     */
    RevokeCertificate = 'ra.revokeCertificate',
    /**
     * This service allows a user to revoke his own certificate.
     */
    RevokeMyCertificate = 'ra.revokeMyCertificate',
    /**
     * Sends a validation request in order to validate ID documents with the provided user info and getting
     * a validation result.
     * If the manual validation is activated in the request and there is a timeout when attempting the automatic
     * validation, then a validation result will be returned with the status pending.
     * If the manual validation is not activated then an invalid status will be returned.
     *
     * Optionally, a callback URL can be provided. This URL will be requested when the validation
     * session is completed (i.e. it ended with a final status).
     */
    Validate = 'validator.validate',
    /**
     * Retrieves the validation result of the validation session that matches the given id.
     */
    GetResult = 'validator.getResult',
}

type MethodRequestMapping = {
    [Method.MatchAccount]: {
        param: MatchingFilter;
        response: MatchingResult[];
    };
    [Method.CheckOperatorStatus]: {
        param: string;
        response: OperatorStatus;
    };
    [Method.GetCertificateAgreement]: {
        param: string;
        response: Buffer;
    };
    [Method.RevokeCertificate]: {
        param: string;
        response: 0;
    };
    [Method.RevokeMyCertificate]: {
        param: void;
        response: 0;
    };
    [Method.Validate]: {
        param: ValidationRequest;
        response: ValidatorResult;
    };
    [Method.GetResult]: {
        param: string;
        response: ValidatorResult;
    };
}

type Request<M extends Method> = MethodRequestMapping[M];

export type Params<M extends Method> = Request<M>['param'];
export type Response<M extends Method> = Request<M>['response'];

export { PersonalInfo } from './PersonalInfo';
export { CertificateInfo } from './CertificateInfo';

export { IdDocument, IdDocumentType } from './IdDocument';

export { MatchingFilter } from './MatchingFilter';
export { MatchingResult, MatchingResultCertificateLevel, MatchingResultCertificateStatus } from './MatchingResult';

export { ValidationRequest } from './ValidationRequest';
export { ValidatorResult, ValidatorResultReason, ValidatorResultStatus } from './ValidatorResult';
