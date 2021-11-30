import { BaseObject } from "../BaseObject";

import { Language } from "./Language";
import { RedirectionConfig } from "./RedirectionConfig";
import { RegistrationRequest } from './RegistrationRequest';

export enum TransactionSignerRole {
    /**
     * This actor is a signer and he will be able to view the documents and sign them.
     */
    Signer = 'signer',
    /**
     * This actor is an observer and he will be able only to view the documents.
     */
    Observer = 'observer'
}

export enum TransactionSignerCertificateType {
    /**
     * Allows signers to perform a certified signature.
     */
    Certified = 'certified',
    /**
     * Allows signers to perform an advanced signature which requires the same options as a **certified** signature.
     */
    Advanced = 'advanced',
    /**
     * Allows signers to perform a simple signature.
     */
    Simple = 'simple',
}

export enum TransactionSignerRedirectPolicy {
    /**
     * The redirection page displays the signed pages.
     */
    Dashboard = 'dashboard',
    /**
     * The redirection page does not display the signed pages.
     */
    Quick = 'quick'
}

/**
 * A `TransactionSigner` describes and contains options for a document signer.
 */
interface ITransactionSigner {
    /**
     * This signer’s firstname. Note that this field is mandatory for a self-signed certificate.
     *
     * When using validationSessionId, it must be set to the same value than the one used in the validation request.
     */
    firstname?: string;
    /**
     * This signer’s lastname. Note that this field is mandatory for a self-signed certificate.
     *
     * When using validationSessionId, it must be set to the same value than the one used in the validation request.
     */
    lastname?: string;
    /**
     * This signer’s organization.
     */
    organization?: string;
    /**
     * The name of the signer profile to use for some customizations. It is set up by the UNIVERSIGN team.
     */
    profile?: string;
    /**
     * This signer’s e-mail address. Note that all users except the first must have an email address set.
     * The first user must have one if he has to be contacted by e-mail, e.g. for authentication or
     * if the `mustContactFirstSigner` parameter of {@link TransactionRequest} is set to _`true`_.
     */
    emailAddress?: string;
    /**
     * This signer’s mobile phone number that should be written in the international format:
     * the country code followed by the phone number (for example, in France 33 XXXXXXXXX).
     */
    phoneNum?: string;
    /**
     * The language for the signer’s transaction.
     * @default {@link Language.English}
     */
    language?: Language;
    /**
     * The role of this transaction actor.
     * @default {@link TransactionSignerRole.Signer}
     */
    role?: string;
    /**
     * This signer’s birth date. This is an option for the **certified** signature,
     * if it’s set, the user won’t be asked to provide it’s birth date during the RA workflow.
     *
     * When using validationSessionId, it must be set to the same value than the one used in the validation request.
     */
    birthDate?: string;
    /**
     * An external identifier given by the organization that indicates this signer.
     */
    universignId?: string;
    /**
     * The configuration of the signer redirection in the event that the signing process completes successfully.
     */
    successRedirection?: RedirectionConfig;
    /**
     * The configuration of the signer redirection in the event that the signing process is canceled.
     */
    cancelRedirection?: RedirectionConfig;
    /**
     * The configuration of the signer redirection in the event that the signing process fails.
     */
    failRedirection?: RedirectionConfig;
    /**
     * Indicates which certificate type will be used to perform the signature and
     * therefore which type of signature will be performed by this signer.
     * @default {@link TransactionSignerCertificateType.Simple}
     */
    certificateType?: TransactionSignerCertificateType;
    /**
     * The ID documents to use in a signer registration.
     *
     * This is an option for the **certified** signature, if it’s set,
     * the user won’t be prompted to provide its ID documents in the RA workflow.
     */
    idDocuments?: RegistrationRequest;
    /**
     * The ID of a valid ID Validation Session retrieved from a validation request.
     * The documents in this ID Validation session will be used and no need to provide `idDocuments`.
     */
    validationSessionId?: string;
    /**
     * This option allow to customize the way signers are redirect after signing documents.
     *
     * If this field is not specified, field set in {@link TransactionRequest} is used.
     * @default {@link TransactionSignerRedirectPolicy.Dashboard}
     */
    redirectPolicy?: string;
    /**
     * The waiting time in seconds for signers to be redirected if _`redirectPolicy`_ is dashboard.
     *
     * The lower bound is "2", the upper bound is "30" and default value is "5".
     *
     * This field must not be set if redirectPolicy is quick.
     * If this field is not specified, field set in {@link TransactionRequest} is used.
     */
    redirectWait?: number;
    /**
     * Whether the subscription agreements email should be automatically sent to signer. If set to false, the email
     * will be sent by the transaction’s operator himself.
     * If set, this value overrides the {@link TransactionRequest} one.
     */
    autoSendAgreements?: boolean;
    /**
     * A custom message added to the invitation email.
     *
     * If this field is not specified, field set in {@link TransactionRequest} is used.
     */
    invitationMessage?: string;
}

/**
 * Class representing a {@link ITransactionSigner}.
 */
export class TransactionSigner extends BaseObject<ITransactionSigner> implements ITransactionSigner {
    /**
     * Create a new instance of a `TransactionSigner`.
     * @constructor
     * @param {ITransactionSigner} transactionSigner
     */
    constructor(transactionSigner: ITransactionSigner) {
        super(transactionSigner);
    }
}
