import { BaseObject } from '../BaseObject';

/**
 * The `MatchingFilter` data structure contains matching criteria on users.
 */
interface IMatchingFilter {
    /**
     * A last name.
     */
    lastname: string;
    /**
     * A first name.
     */
    firstname: string;
    /**
     * A mobile phone number.
     *
     * Must be set if email isn't provided.
     */
    mobile?: string;
    /**
     * A e-mail address.
     *
     * Must be set if mobile isn't provided.
     */
    email?: string;
}

/**
 * Class representing a {@link IMatchingFilter}.
 */
export class MatchingFilter extends BaseObject<IMatchingFilter>implements IMatchingFilter {
    readonly firstname: string;
    readonly lastname: string;

    /**
     * Create a new instance of a `MatchingFilter`.
     * @constructor
     * @param {IMatchingFilter} matchingFilter
     */
    constructor(matchingFilter: IMatchingFilter) {
        super(matchingFilter);
        this.firstname = matchingFilter.firstname;
        this.lastname = matchingFilter.lastname;
    }
}
