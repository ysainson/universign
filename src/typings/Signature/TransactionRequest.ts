import { BaseObject } from "../BaseObject";

import { Language } from "./Language";
import { TransactionSigner } from "./TransactionSigner";
import { TransactionDocument } from './TransactionDocument';
import { RedirectionConfig } from './RedirectionConfig';
import { RedirectPolicy } from './RedirectPolicy';

export enum TransactionRequestCertificateType {
    /**
     * Allows signers to perform a level 1 signature.
     */
    Simple = 'simple',
    /**
     * Allows signers to perform a level 2 signature.
     */
    Certified = 'certified',
    /**
     * Allows signers to perform a level 3 signature.
     */
    Advanced = 'advanced',
}

export enum TransactionRequestChainingMode {
    /**
     * No invitation email is sent in this mode. Each signer is redirected to the successURL after signing.
     * It is up to the requester to contact each of the signers.
     */
    None = 'none',
    /**
     * The signers receive the invitation email (except for the first one, see {@link `mustContactFirstSigner`})
     * and are redirected to the successURL.
     */
    Email = 'email',
    /**
     * Enables the `linked signature` mode. In this mode, all signers are physically at the same place.
     * After a signer completed its signature,
     * he will be redirected to the next signer’s signature page instead of being returned to the `successURL`
     * and the next signer will not receive an invitation mail. The last signer will be redirected to the `successURL`.
     */
    Web = 'web'
}

/**
 * The `TransactionRequest` data structure contains information and options for a Signature transaction creation.
 */
interface ITransactionRequest {
    /**
     * The name of the signature profile to use.
     * Signature profiles mainly differ by the displayed company name and logo, and the pre-configured signature field stored within.
     * Signature profiles are set up by the UNIVERSIGN team.
     * @default "default"
     */
    profile?: string;
    /**
     * A requester-set unique id that can be used to identify this transaction. If not unique, a fault will be thrown.
     * Note that UNIVERSIGN generate its own unique id for each transaction and return it to the requester.
     */
    customId?: string;
    /**
     * The signers that will have to take part to the transaction. Must contain at least one element.
     */
    signers: TransactionSigner[];
    /**
     * The documents to be signed. Must contain at least one element. The size limit of each document is set to 10MB.
     */
    documents: TransactionDocument[],
    /**
     * If set to `true`, the first signer will receive an invitation to sign the document(s) by e-mail as soon as the transaction is requested.
     * @default false
     */
    mustContactFirstSigner?: boolean;
    /**
     * Tells whether each signer must receive the signed documents by e-mail when the transaction is completed.
     * @default false
     */
    finalDocSent?: boolean;
    /**
     * Tells whether the requester must receive the signed documents via e-mail when the transaction is completed.
     * @default false
     */
    finalDocRequesterSent?: boolean;
    /**
     * Tells whether the observers must receive the signed documents via e-mail when the transaction is completed.
     * @default value of {@link finalDocSent}
     */
    finalDocObserverSent?: boolean;
    /**
     * Description or title of the signature.
     */
    description?: string;
    /**
     * Option that indicates which certificate type will be used to perform the signature
     * (and therefore which type of signature is expected).
     * @default {@link Simple}
     */
    certificateType?: TransactionRequestCertificateType;
    /**
     * The language for this transaction.
     * @default {@link English}
     */
    language?: Language;
    /**
     * The mode to enable the `handwritten signature`.
     *
     * If `handwritten signature` is enabled, the signer is prompted to draw a signature on the web interface
     * and the {@link SignatureField} bean becomes mandatory for each of the {@link TransactionSigner}.
     * This signature is added in his signature field, as an image would be.
     * HandwrittenSignatureMode can not be enabled against a transaction containing only document for presentation.
     */
    handwrittenSignatureMode?: string;
    /**
     * This option indicates how the signers are chained during the signing process.
     * @default {@link Email}
     */
    TransactionSignerRole?: TransactionRequestChainingMode;
    /**
     * This option allows to send a copy of the final signed documents to a list of email addresses.
     * This copy is send as cc for every final signed documents email addressed to a signer.
     * For this option to be taken into account, the option `finalDocSent` must be sent to `true`.
     */
    finalDocCCeMails?: string[];
    /**
     * The configuration of the signer redirection in the event that an advanced signature is interrupted after
     * the automatic validation step.
     */
    autoValidationRedirection?: RedirectionConfig;
    /**
     * This option allow to customize the way signers are redirect after signing documents.
     *
     * This field can be overridden in {@link TransactionSigner} for a specific signer.
     */
    redirectPolicy?: RedirectPolicy;
    /**
     * The waiting time in seconds for signers to be redirected if {@link redirectPolicy} is {@link Dashboard}.
     *
     * The lower bound is "2", the upper bound is "30" and default value is "5".
     *
     * This field must **not** be set if {@link redirectPolicy} is {@link Quick}.
     *
     * This field can be overridden in {@link TransactionSigner} for a specific signer.
     */
    redirectWait?: number;
    /**
     * Whether the subscription agreements email should be automatically sent to signers.
     * If set to false, the email will be sent by the transaction’s operator himself.
     * This field can be overridden in {@link TransactionSigner} for a specific signer.
     */
    autoSendAgreements?: boolean;
    /**
     * The default registration authority operator email address. This field is used only for **advanced** transactions.
     * This address must match with a well-known registration authority operator by Universign.
     * It is only used to send the transaction creation email.
     * If not specified, the email is sent to the transaction creator.
     */
    operator?: string;
    /**
     * The callback URL to be requested when the RA validation is completed.
     * This field is used only for **advanced** transactions.
     * A **GET** request will be performed with following parameters appended to the URL:
     *
     * <pre>
     *      id : The transaction id received in TransactionResponse.
     *      signer : The index of the current signer of the transaction.
     *      status : The RA status: INVALID or AWAITING_AGREEMENT.
     * </pre>
     *
     * @example
     * "http://www.company.com/registration/?id=XXX-XXX-YYY&signer=2&status=AWAITING_AGREEMENT"
     */
    registrationCallbackURL?: string;
    /**
     * The configuration of the signer redirection in the event that the signing process is successfully completed.
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
     * A custom message added to the invitation email for signing for every signer.
     *
     * This field can be overridden in {@link TransactionSigner} for a specific signer.
     */
    invitationMessage?: string;
}

/**
 * Class representing a {@link ITransactionRequest}.
 */
export class TransactionRequest extends BaseObject<ITransactionRequest> implements ITransactionRequest {
    readonly signers: TransactionSigner[];
    readonly documents: TransactionDocument[];

    /**
     * Create a new instance of a `TransactionRequest`.
     * @constructor
     * @param {ITransactionRequest} transactionRequest
     */
    constructor(transactionRequest: ITransactionRequest) {
        super(transactionRequest);
        this.signers = transactionRequest.signers;
        this.documents = transactionRequest.documents;
    }
}
