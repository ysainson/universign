import { SignOptions } from './SignOptions';

import { TransactionRequest } from './TransactionRequest';
import { TransactionResponse } from './TransactionResponse';
import { TransactionDocument } from './TransactionDocument';
import { TransactionInfo } from './TransactionInfo';

export enum Method {
    /**
     * Signs a document, using the default signature profile and options.
     */
    Sign = 'signer.sign',
    /**
     * Signs a document, using a set of options.
     */
    SignWithOptions = 'signer.signWithOptions',
    /**
     * Requests a new transaction for the client signature service.
     * Sends the document to be signed and other parameters and returns an URL where the end user should be redirected to.
     * A transaction must be completed within 14 days after its request.
     */
    RequestTransaction = 'requester.requestTransaction',
    /**
     * Requests the list of the transaction’s documents (after their transaction is completed) by their transaction id.
     *
     * The values of the signature fields of each {@link TransactionDocument} are not returned by this service.
     */
    GetDocuments = 'requester.getDocuments',
    /**
     * Requests the list of the transaction’s documents (after their transaction is finished) by their custom id.
     * This method is very similar to {@link GetDocuments}. It can be used if you do not want to store an external ID.
     *
     * The values of the signature fields of each {@link TransactionDocument} are not returned by this service.
     */
    GetDocumentsByCustomId = 'requester.getDocumentsByCustomId',
    /**
     * Requests information about the status of the transaction with this id.
     */
    GetTransactionInfo = 'requester.getTransactionInfo',
    /**
     * Requests information about the status of the transaction with this id.
     * This method is very similar to the previous one. It can be used if you do not want to store an external ID.
     */
    GetTransactionInfoByCustomId = 'requester.getTransactionInfoByCustomId',
    /**
     * Refreshes the creation date for the transaction.
     * The invitation email is sent again if the parameters allow it
     * ({@link TransactionRequestChainingMode} equals {@link Email}
     * and in the case of the first signer, {@link mustContactFirstSigner} equals true).
     * This method can be used to postpone the expiration date of the transaction.
     */
    RelaunchTransaction = 'requester.relaunchTransaction',
    /**
     * Cancel a transaction in progress with this id.
     */
    CancelTransaction = 'requester.cancelTransaction',
    /**
     * Requests the list of transactions matching the given filter.
     * At most 1000 results are returned: to have more results, use multiple requests and ranges in {@link TransactionFilter}.
     * @todo implement the TransactionFilter entity
     */
    // ListTransactions = 'requester.listTransactions',
    /**
     * Requests the standalone registration of the signer.
     * Sends the signer identity to be certified and returns an URL where the signer should be redirected to.
     * The registration process is similar to the transaction one but without documents to sign.
     * @todo implement the StandaloneRegistrationRequest entity
     */
    // RequestRegistration = 'requester.requestRegistration',
    /**
     * Cancel a standalone registration in progress with its id. Registration can be canceled:
     *  * if the registration status is not expired, completed, canceled or failed
     *  * if the status of the RA record linked to this registration is
     *      init, awaiting_id_doc, awaiting_validation, awaiting_agreement or aborted
     *  * by the owner of the registration only
     */
    CancelRegistration = 'requester.cancelRegistration'

}

type MethodRequestMapping = {
    [Method.Sign]: {
        param: Buffer;
        response: Buffer;
    };
    [Method.SignWithOptions]: {
        param: [Buffer, SignOptions];
        response: Buffer;
    };
    [Method.RequestTransaction]: {
        param: TransactionRequest;
        response: TransactionResponse;
    };
    [Method.GetDocuments]: {
        param: string;
        response: TransactionDocument[];
    };
    [Method.GetDocumentsByCustomId]: {
        param: string;
        response: TransactionDocument[];
    };
    [Method.GetTransactionInfo]: {
        param: string;
        response: TransactionInfo;
    };
    [Method.GetTransactionInfoByCustomId]: {
        param: string;
        response: TransactionInfo;
    };
    [Method.RelaunchTransaction]: {
        param: string;
        response: 0;
    };
    [Method.CancelTransaction]: {
        param: string;
        response: 0;
    };
    [Method.CancelRegistration]: {
        param: string;
        response: 0;
    };
}

type Request<M extends Method> = MethodRequestMapping[M];

export type Params<M extends Method> = Request<M>['param'];
export type Response<M extends Method> = Request<M>['response'];

export { Language } from './Language';
export { InitiatorInfo } from './InitiatorInfo';
export { CertificateInfo } from './CertificateInfo';

export { RedirectPolicy } from './RedirectPolicy';
export { RedirectionConfig } from './RedirectionConfig';

export { TransactionResponse } from './TransactionResponse';
export { TransactionInfo, TransactionInfoStatus } from './TransactionInfo';
export { TransactionDocument, TransactionDocumentType} from './TransactionDocument';
export { TransactionSigner, TransactionSignerCertificateType, TransactionSignerRole} from './TransactionSigner';
export { TransactionRequest, TransactionRequestCertificateType, TransactionRequestChainingMode } from './TransactionRequest';

export { RegistrationRequest, RegistrationRequestType} from './RegistrationRequest';

export { SignatureField } from './SignatureField';
export { DocSignatureField } from './DocSignatureField';

export { SEPAData } from './SEPAData';
export { SEPAThirdParty } from './SEPAThirdParty';

export { SignOptions, SignOptionsSignatureFormat } from './SignOptions';
export { SignerInfo, SignerInfoSignerStatus, SignerInfoObserverStatus } from './SignerInfo';
