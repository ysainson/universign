import { RedirectPolicy } from './RedirectPolicy';
import { SignerInfo } from './SignerInfo';
import { InitiatorInfo } from './InitiatorInfo';

export enum TransactionInfoStatus {
    /**
     * Signers can connect and sign.
     */
    Ready = 'ready',
    /**
     * The transaction has been requested more than 14 days ago. It will no more be available to signers.
     */
    Expired = 'expired',
    /**
     * A signer has canceled the transaction. Signers will no more be able to connect to the service.
     */
    Canceled = 'canceled',
    /**
     * An error occurred during a signature. The signers won’t be able to connect to the service.
     */
    Failed = 'failed',
    /**
     * All signers have successfully sign, the requester can retrieve the documents.
     */
    Completed = 'completed'
}

/**
 * The `TransactionInfo` data structure describes the status of a transaction.
 * This structure is used as a return value only, and will never be instantiated by users.
 */
export interface TransactionInfo {
    /**
     * The status of the transaction.
     */
    status: TransactionInfoStatus;
    /**
     * A list of bean containing information about the signers and their progression in the signature process.
     */
    signerInfos: SignerInfo[];
    /**
     * The index of current signer if the status of transaction is ready or who ended the transactions for other status.
     */
    currentSigner: number;
    /**
     * The creation date or last relaunch date of this transaction.
     */
    creationDate: Date;
    /**
     * The description of the Transaction.
     */
    description: string;
    /**
     * A bean containing information about the requester of a transaction.
     */
    initiatorInfo: InitiatorInfo;
    /**
     * Whether the transaction was requested with requesting handwritten signature for each signature field or not.
     */
    eachField: boolean;
    /**
     * This id can be specified when creating the transaction request
     * and is used as additional information to identify the transaction.
     */
    customerId: string;
    /**
     * This id is generated when creating the transaction request and is the unique identifier of this transaction.
     */
    transactionId: string;
    /**
     * The policy which describe how signers are redirect after signing documents.
     */
    redirectPolicy: RedirectPolicy;
    /**
     * The waiting time in seconds for the signer to be redirected.
     */
    redirectWait: number;
}
