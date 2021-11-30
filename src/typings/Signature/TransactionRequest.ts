import { BaseObject } from "../BaseObject";

import { Language } from "./Language";
import { TransactionSigner } from "./TransactionSigner";
import { TransactionDocument } from './TransactionDocument';

/**
 * The `TransactionRequest` data structure contains information and options for a Signature transaction creation.
 */
interface ITransactionRequest {
    /**
     * The name of the signature profile to use.
     * Signature profiles mainly differ by the displayed company name and logo, and the pre-configured signature field stored within.
     * Signature profiles are set up by the UNIVERSIGN team.
     * @default default
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
     * The language for this transaction.
     * @default {@link Language.English}
     */
    language?: Language;
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
