import { CertificateInfo } from './CertificateInfo';

export enum MatchingResultCertificateLevel {
    /**
     * The user does not have a currently valid certificate.
     */
    None = 'none',
    Advanced = 'advanced',
    Certified = 'certified'
}

export enum MatchingResultCertificateStatus {
    /**
     * The certificate is valid.
     */
    Valid = 'valid',
    /**
     * The certificate needs validation.
     */
    AwaitingValidation = 'awaiting-validation',
    /**
     * The agreements need to be signed.
     */
    AwaitingAgreement = 'awaiting-agreement'
}

/**
 * The `MatchingResult` data structure contains the data of a UNIVERSIGN users.
 * This structure is a return value only and will never be instantiated by users.
 */
export interface MatchingResult {
    /**
     * The user’s last name if set, **null** otherwise.
     */
    lastname: string | null;
    /**
     * The user’s first name if set, **null** otherwise.
     */
    firstname: string | null;
    /**
     * The user’s mobile phone number if set, **null** otherwise.
     */
    mobile: string | null;
    /**
     * The user’s e-mail address.
     */
    email: string;
    /**
     * The certification level of this user.
     */
    certificateLevel: MatchingResultCertificateLevel;
    certificateStatus: MatchingResultCertificateStatus;
    /**
     * If `certificateLevel` is not **none**, a bean containing information about the certificate used by the user,
     * **null** otherwise.
     */
    certificateInfo: CertificateInfo | null;
}
