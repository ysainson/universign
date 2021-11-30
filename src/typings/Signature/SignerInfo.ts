import { CertificateInfo } from './CertificateInfo';
import { RedirectPolicy } from './RedirectPolicy';

/**
 * The status of the observer.
 */
export enum SignerInfoObserverStatus {
    /**
     * The observer has not yet been invited to access the document(s). Others signers must sign prior to this user.
     */
    WAITING = 'waiting',
    /**
     * The observer has been invited to access the document(s), but has not tried yet.
     */
    READY = 'ready',
    /**
     * The observer has accessed the document(s).
     */
    ACCESSED = 'accessed'
}

/**
 * The status of the signer.
 */
export enum SignerInfoSignerStatus {
    /**
     * The signer has not yet been invited to sign. Others signers must sign prior to this user.
     */
    WAITING = 'waiting',
    /**
     * The signer has been invited to sign, but has not tried yet.
     */
    READY = 'ready',
    /**
     * The signer has accessed the signature service.
     */
    ACCESSED = 'accessed',
    /**
     * The signer agreed to sign and has been sent an OTP.
     */
    CODE_SENT = 'code-sent',
    /**
     * The signer has successfully signed.
     */
    SIGNED = 'signed',
    /**
     * The signer has successfully signed and should send the documents to complete his registration.
     */
    PENDING_ID_DOCS = 'pending-id-docs',
    /**
     * The signer has successfully signed and is pending RA validation.
     */
    PENDING_VALIDATION = 'pending-validation',
    /**
     * The signer refused to sign, or one of the previous signers canceled or failed its signature.
     */
    CANCELED = 'canceled',
    /**
     * An error occurred during the signature. In this case, `error` is set.
     */
    FAILED = 'failed'
}


/**
 * The `SignerInfo` data structure describes the status of a signer.
 * This structure is used as a return value only, and will never be instantiated by users.
 */
export interface SignerInfo {
    status: SignerInfoSignerStatus | SignerInfoObserverStatus;
    /**
     * The error message in case of failure.
     */
    error: string;
    /**
     * A bean containing information about the certificate the signer used (or attempt to) to sign.
     * If the signer has not signed yet or in some cases if an error occurs during the signature,
     * an empty struct will be set for his certificate.
     */
    certificateInfo: CertificateInfo;
    /**
     * The URL of the signature page.
     */
    url: string;
    /**
     * The signer’s ID.
     */
    id: string;
    /**
     * The signer’s email.
     */
    email: string;
    /**
     * The signer’s firstname.
     */
    firstName: string;
    /**
     * The signer’s lastname.
     */
    lastName: string;
    /**
     * The action date (signature, cancel or other).
     */
    actionDate: Date;
    /**
     * List of refused docs indexes.
     */
    refusedDocs: number[];
    /**
     * Comment added by signer in case of document refusal.
     */
    refusalComment: string;
    /**
     * The policy which describe how the signer is redirect after signing documents.
     */
    redirectPolicy: RedirectPolicy;
    /**
     * The waiting time in seconds for the signer to be redirected.
     */
    redirectWait: number;
}
