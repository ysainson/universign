/**
 * The `InitiatorInfo` data structure describes the requester of a transaction.
 * This structure is used as a return value only, and will never be instantiated by users.
 */
export interface InitiatorInfo {
    /**
     * The requester’s email.
     */
    email: string;
    /**
     * The requester’s firstname.
     */
    firstName: string;
    /**
     * The requester’s lastname.
     */
    lastName: string;
}
