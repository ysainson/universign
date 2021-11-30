/**
 * The `TransactionResponse` data structure is the response sent after a request for a transaction.
 * This structure is used as a return value only, and will never be instantiated by users.
 */
export interface TransactionResponse {
    /**
     * The URL to the web interface for the first signer.
     */
    url: string;
    /**
     * This transaction id.
     */
    id: string;
}
