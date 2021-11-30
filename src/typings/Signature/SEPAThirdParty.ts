import { BaseObject } from "../BaseObject";

/**
 * The `SEPAThirdParty` data structure is used to define information on both the debtor
 * and the creditor of a SEPA mandate.
 */
interface ISEPAThirdParty {
    /**
     * The full name of this debtor/creditor.
     */
    name: string;
    /**
     * The address of this debtor/creditor.
     */
    address: string;
    /**
     * The postal code of this debtor/creditor.
     */
    postalCode: string;
    /**
     * The city of this debtor/creditor.
     */
    city: string;
    /**
     * The country of this debtor/creditor.
     */
    country: string;
}

/**
 * Class representing a {@link ISEPAThirdParty}.
 */
export class SEPAThirdParty extends BaseObject<ISEPAThirdParty> implements ISEPAThirdParty {
    readonly name: string;
    readonly address: string;
    readonly postalCode: string;
    readonly city: string;
    readonly country: string;

    /**
     * Create a new instance of a `SEPAThirdParty`.
     * @constructor
     * @param {ISEPAThirdParty} sepaThirdParty
     */
    constructor(sepaThirdParty: ISEPAThirdParty) {
        super(sepaThirdParty);
        this.name = sepaThirdParty.name;
        this.address = sepaThirdParty.address;
        this.postalCode = sepaThirdParty.postalCode;
        this.city = sepaThirdParty.city;
        this.country = sepaThirdParty.country;
    }
}
